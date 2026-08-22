// Extract GPS coordinates from an image's EXIF metadata, in the browser.
//
// Walks the JPEG APP1 segment properly, and falls back to scanning the whole
// file for an "Exif\0\0" header so HEIC, TIFF and WebP containers work too --
// the payload is contiguous in all of them, and the TIFF magic is checked
// before anything is trusted.

const TAG_GPS_IFD = 0x8825;
const GPS_LAT_REF = 1, GPS_LAT = 2, GPS_LON_REF = 3, GPS_LON = 4;
const GPS_ALT_REF = 5, GPS_ALT = 6, GPS_DATE = 29, GPS_HPOS_ERR = 31;

// EXIF type -> bytes per component.
const TYPE_SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8 };

function findExifStart(view) {
  const len = view.byteLength;

  // Proper path: walk JPEG segments to the APP1 that carries EXIF.
  if (len > 4 && view.getUint16(0) === 0xffd8) {
    let off = 2;
    while (off + 4 <= len) {
      if (view.getUint8(off) !== 0xff) break;
      const marker = view.getUint8(off + 1);
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        off += 2;
        continue;
      }
      if (marker === 0xda || marker === 0xd9) break; // start of scan / end of image
      const size = view.getUint16(off + 2);
      if (size < 2) break;
      if (marker === 0xe1 && off + 10 <= len) {
        if (
          view.getUint32(off + 4) === 0x45786966 && // "Exif"
          view.getUint16(off + 8) === 0x0000
        ) {
          return off + 10;
        }
      }
      off += 2 + size;
    }
  }

  // Fallback: scan for the EXIF header anywhere (HEIC, TIFF, WebP, PNG).
  for (let i = 0; i + 10 < len; i++) {
    if (
      view.getUint8(i) === 0x45 && view.getUint8(i + 1) === 0x78 &&
      view.getUint8(i + 2) === 0x69 && view.getUint8(i + 3) === 0x66 &&
      view.getUint8(i + 4) === 0x00 && view.getUint8(i + 5) === 0x00
    ) {
      const tiff = i + 6;
      const bom = view.getUint16(tiff);
      if (bom === 0x4949 || bom === 0x4d4d) return tiff;
    }
  }
  return -1;
}

function readIFD(view, tiff, ifdOffset, little) {
  const entries = {};
  if (ifdOffset + 2 > view.byteLength) return entries;
  const count = view.getUint16(tiff + ifdOffset, little);
  // A plausible IFD has a modest entry count; anything wilder is corrupt data.
  if (count > 512) return entries;

  for (let i = 0; i < count; i++) {
    const entry = tiff + ifdOffset + 2 + i * 12;
    if (entry + 12 > view.byteLength) break;
    const tag = view.getUint16(entry, little);
    const type = view.getUint16(entry + 2, little);
    const num = view.getUint32(entry + 4, little);
    const unit = TYPE_SIZE[type];
    if (!unit || num > 4096) continue;

    const total = unit * num;
    let dataOffset = entry + 8;
    if (total > 4) {
      dataOffset = tiff + view.getUint32(entry + 8, little);
    }
    if (dataOffset + total > view.byteLength || dataOffset < 0) continue;

    entries[tag] = readValue(view, dataOffset, type, num, little);
  }
  return entries;
}

function readValue(view, offset, type, num, little) {
  const out = [];
  for (let i = 0; i < num; i++) {
    switch (type) {
      case 1: case 7: out.push(view.getUint8(offset + i)); break;
      case 2: out.push(String.fromCharCode(view.getUint8(offset + i))); break;
      case 3: out.push(view.getUint16(offset + i * 2, little)); break;
      case 4: out.push(view.getUint32(offset + i * 4, little)); break;
      case 9: out.push(view.getInt32(offset + i * 4, little)); break;
      case 8: out.push(view.getInt16(offset + i * 2, little)); break;
      case 11: out.push(view.getFloat32(offset + i * 4, little)); break;
      case 12: out.push(view.getFloat64(offset + i * 8, little)); break;
      case 5: case 10: {
        const n = type === 5
          ? view.getUint32(offset + i * 8, little)
          : view.getInt32(offset + i * 8, little);
        const d = type === 5
          ? view.getUint32(offset + i * 8 + 4, little)
          : view.getInt32(offset + i * 8 + 4, little);
        out.push(d === 0 ? 0 : n / d);
        break;
      }
      default: return null;
    }
  }
  if (type === 2) return out.join("").replace(/\0+$/, "");
  return out;
}

function toDegrees(dms) {
  if (!Array.isArray(dms) || dms.length < 1) return null;
  const [d = 0, m = 0, s = 0] = dms;
  if ([d, m, s].some((v) => typeof v !== "number" || !isFinite(v))) return null;
  return d + m / 60 + s / 3600;
}

/**
 * @returns {null | {lat, lon, sigmaKm, altitude?, date?}}
 */
export function extractGps(buffer) {
  let view;
  try {
    view = new DataView(buffer);
  } catch { return null; }

  const tiff = findExifStart(view);
  if (tiff < 0 || tiff + 8 > view.byteLength) return null;

  const bom = view.getUint16(tiff);
  if (bom !== 0x4949 && bom !== 0x4d4d) return null;
  const little = bom === 0x4949;
  if (view.getUint16(tiff + 2, little) !== 42) return null;

  const ifd0Offset = view.getUint32(tiff + 4, little);
  const ifd0 = readIFD(view, tiff, ifd0Offset, little);

  const gpsPointer = ifd0[TAG_GPS_IFD];
  if (!gpsPointer || !gpsPointer.length) return null;
  const gps = readIFD(view, tiff, gpsPointer[0], little);

  let lat = toDegrees(gps[GPS_LAT]);
  let lon = toDegrees(gps[GPS_LON]);
  if (lat === null || lon === null) return null;

  const latRef = String(gps[GPS_LAT_REF] || "N").trim().toUpperCase();
  const lonRef = String(gps[GPS_LON_REF] || "E").trim().toUpperCase();
  if (latRef.startsWith("S")) lat = -lat;
  if (lonRef.startsWith("W")) lon = -lon;

  if (!isFinite(lat) || !isFinite(lon)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  // (0, 0) is in the Gulf of Guinea and is nearly always a stripped tag.
  if (Math.abs(lat) < 1e-7 && Math.abs(lon) < 1e-7) return null;

  let sigmaKm = 0.05;
  const err = gps[GPS_HPOS_ERR];
  if (Array.isArray(err) && isFinite(err[0]) && err[0] > 0) {
    sigmaKm = Math.max(0.005, err[0] / 1000);
  }

  const result = { lat, lon, sigmaKm };

  const alt = gps[GPS_ALT];
  if (Array.isArray(alt) && isFinite(alt[0])) {
    const below = Array.isArray(gps[GPS_ALT_REF]) && gps[GPS_ALT_REF][0] === 1;
    result.altitude = below ? -alt[0] : alt[0];
  }
  if (typeof gps[GPS_DATE] === "string" && gps[GPS_DATE].length >= 8) {
    result.date = gps[GPS_DATE].replace(/:/g, "-");
  }
  return result;
}
