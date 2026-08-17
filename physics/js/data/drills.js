/* Randomised calculation drills. Each drill's gen() returns a fresh question:
     given  [[label, value, unit], ...]   the data supplied
     ask    [label, unit]                 what to calculate
     ans    the correct value
     work   the worked solution shown after answering
   Answers are marked correct within a small tolerance so rounding is not punished. */
(function () {
  function ri(lo, hi) { return Math.floor(Math.random() * (hi - lo + 1)) + lo; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function sf(x, n) { return Number(x.toPrecision(n || 3)); }

  window.DRILLS = [

  { s:1, name:'Average speed', eq:'v = s / t', gen:function () {
      var s = ri(20, 60) * 10, t = ri(4, 40);
      return { given:[['distance moved', s, 'm'], ['time taken', t, 's']],
        ask:['average speed', 'm/s'], ans:s / t,
        work:'v = s / t = ' + s + ' / ' + t + ' = ' + sf(s / t) + ' m/s' };
    }},

  { s:1, name:'Acceleration', eq:'a = (v − u) / t', gen:function () {
      var u = ri(0, 12), v = u + ri(4, 30), t = ri(2, 15);
      return { given:[['initial velocity u', u, 'm/s'], ['final velocity v', v, 'm/s'], ['time taken', t, 's']],
        ask:['acceleration', 'm/s²'], ans:(v - u) / t,
        work:'a = (v − u) / t = (' + v + ' − ' + u + ') / ' + t + ' = ' + sf((v - u) / t) + ' m/s²' };
    }},

  { s:1, name:'Newton’s second law', eq:'F = m × a', gen:function () {
      var m = ri(2, 150) * 10, a = ri(1, 9);
      return { given:[['mass', m, 'kg'], ['acceleration', a, 'm/s²']],
        ask:['resultant force', 'N'], ans:m * a,
        work:'F = m × a = ' + m + ' × ' + a + ' = ' + (m * a) + ' N' };
    }},

  { s:1, name:'Weight', eq:'W = m × g', gen:function () {
      var m = ri(2, 90), g = pick([10, 1.6, 3.7, 25]);
      var where = { 10:'Earth', 1.6:'the Moon', 3.7:'Mars', 25:'Jupiter' }[g];
      return { given:[['mass', m, 'kg'], ['gravitational field strength on ' + where, g, 'N/kg']],
        ask:['weight', 'N'], ans:m * g,
        work:'W = m × g = ' + m + ' × ' + g + ' = ' + sf(m * g) + ' N' };
    }},

  { s:1, name:'Uniform acceleration (no time)', eq:'v² = u² + 2as', gen:function () {
      var u = pick([0, 0, 4, 6]), a = ri(2, 6), s = ri(10, 90);
      var v = Math.sqrt(u * u + 2 * a * s);
      return { given:[['initial speed u', u, 'm/s'], ['acceleration', a, 'm/s²'], ['distance moved', s, 'm']],
        ask:['final speed', 'm/s'], ans:v,
        work:'v² = u² + 2as = ' + (u * u) + ' + 2 × ' + a + ' × ' + s + ' = ' + sf(u * u + 2 * a * s) +
             '\nv = √' + sf(u * u + 2 * a * s) + ' = ' + sf(v) + ' m/s' };
    }},

  { s:1, name:'Moment of a force', eq:'M = F × d', gen:function () {
      var F = ri(5, 60) * 5, d = ri(2, 25) / 10;
      return { given:[['force', F, 'N'], ['perpendicular distance from pivot', d, 'm']],
        ask:['moment', 'N m'], ans:F * d,
        work:'moment = F × d = ' + F + ' × ' + d + ' = ' + sf(F * d) + ' N m' };
    }},

  { s:1, name:'Momentum', eq:'p = m × v', p2:true, gen:function () {
      var m = ri(1, 200) * 5, v = ri(2, 30);
      return { given:[['mass', m, 'kg'], ['velocity', v, 'm/s']],
        ask:['momentum', 'kg m/s'], ans:m * v,
        work:'p = m × v = ' + m + ' × ' + v + ' = ' + (m * v) + ' kg m/s' };
    }},

  { s:2, name:'Ohm’s law', eq:'V = I × R', gen:function () {
      var I = ri(1, 50) / 10, R = ri(2, 120);
      return { given:[['current', I, 'A'], ['resistance', R, 'Ω']],
        ask:['voltage', 'V'], ans:I * R,
        work:'V = I × R = ' + I + ' × ' + R + ' = ' + sf(I * R) + ' V' };
    }},

  { s:2, name:'Resistance from V and I', eq:'R = V / I', gen:function () {
      var V = pick([1.5, 3, 6, 9, 12, 230]), I = ri(1, 40) / 10;
      return { given:[['voltage', V, 'V'], ['current', I, 'A']],
        ask:['resistance', 'Ω'], ans:V / I,
        work:'R = V / I = ' + V + ' / ' + I + ' = ' + sf(V / I) + ' Ω' };
    }},

  { s:2, name:'Electrical power', eq:'P = I × V', gen:function () {
      var V = pick([12, 24, 230]), I = ri(2, 130) / 10;
      return { given:[['voltage', V, 'V'], ['current', I, 'A']],
        ask:['power', 'W'], ans:I * V,
        work:'P = I × V = ' + I + ' × ' + V + ' = ' + sf(I * V) + ' W' };
    }},

  { s:2, name:'Charge', eq:'Q = I × t', gen:function () {
      var I = ri(1, 60) / 10, mins = ri(1, 10);
      var t = mins * 60;
      return { given:[['current', I, 'A'], ['time', mins, 'minutes']],
        ask:['charge', 'C'], ans:I * t,
        work:'t = ' + mins + ' × 60 = ' + t + ' s\nQ = I × t = ' + I + ' × ' + t + ' = ' + sf(I * t) + ' C' };
    }},

  { s:3, name:'Wave equation', eq:'v = f × λ', gen:function () {
      var f = ri(2, 90) * 5, lam = ri(2, 60) / 10;
      return { given:[['frequency', f, 'Hz'], ['wavelength', lam, 'm']],
        ask:['wave speed', 'm/s'], ans:f * lam,
        work:'v = f × λ = ' + f + ' × ' + lam + ' = ' + sf(f * lam) + ' m/s' };
    }},

  { s:3, name:'Frequency from period', eq:'f = 1 / T', gen:function () {
      var T = pick([0.5, 0.25, 0.2, 0.1, 0.05, 0.04, 0.02, 0.01, 0.004]);
      return { given:[['time period', T, 's']],
        ask:['frequency', 'Hz'], ans:1 / T,
        work:'f = 1 / T = 1 / ' + T + ' = ' + sf(1 / T) + ' Hz' };
    }},

  { s:3, name:'Refractive index', eq:'n = sin i / sin r', gen:function () {
      var i = ri(20, 70), r = Math.round(i * (0.55 + Math.random() * 0.15));
      var n = Math.sin(i * Math.PI / 180) / Math.sin(r * Math.PI / 180);
      return { given:[['angle of incidence i', i, '°'], ['angle of refraction r', r, '°']],
        ask:['refractive index', '(no unit)'], ans:n,
        work:'n = sin i / sin r = sin ' + i + '° / sin ' + r + '°\n= ' +
             sf(Math.sin(i * Math.PI / 180), 3) + ' / ' + sf(Math.sin(r * Math.PI / 180), 3) + ' = ' + sf(n) };
    }},

  { s:4, name:'Work done', eq:'W = F × d', gen:function () {
      var F = ri(5, 80) * 10, d = ri(2, 40);
      return { given:[['force', F, 'N'], ['distance moved in direction of force', d, 'm']],
        ask:['work done', 'J'], ans:F * d,
        work:'W = F × d = ' + F + ' × ' + d + ' = ' + (F * d) + ' J' };
    }},

  { s:4, name:'Kinetic energy', eq:'KE = ½ m v²', gen:function () {
      var m = ri(1, 120) * 10, v = ri(2, 30);
      return { given:[['mass', m, 'kg'], ['speed', v, 'm/s']],
        ask:['kinetic energy', 'J'], ans:0.5 * m * v * v,
        work:'KE = ½ × m × v² = 0.5 × ' + m + ' × ' + v + '²\n= 0.5 × ' + m + ' × ' + (v * v) +
             ' = ' + sf(0.5 * m * v * v) + ' J' };
    }},

  { s:4, name:'Gravitational potential energy', eq:'GPE = m × g × h', gen:function () {
      var m = ri(1, 90), h = ri(2, 40);
      return { given:[['mass', m, 'kg'], ['gravitational field strength', 10, 'N/kg'], ['height gained', h, 'm']],
        ask:['gravitational potential energy', 'J'], ans:m * 10 * h,
        work:'GPE = m × g × h = ' + m + ' × 10 × ' + h + ' = ' + (m * 10 * h) + ' J' };
    }},

  { s:4, name:'Power', eq:'P = W / t', gen:function () {
      var W = ri(10, 400) * 100, t = ri(5, 120);
      return { given:[['work done', W, 'J'], ['time taken', t, 's']],
        ask:['power', 'W'], ans:W / t,
        work:'P = W / t = ' + W + ' / ' + t + ' = ' + sf(W / t) + ' W' };
    }},

  { s:4, name:'Efficiency', eq:'efficiency = (useful out / total in) × 100%', gen:function () {
      var total = ri(10, 90) * 100, useful = Math.round(total * (ri(20, 85) / 100));
      return { given:[['total energy input', total, 'J'], ['useful energy output', useful, 'J']],
        ask:['efficiency', '%'], ans:useful / total * 100,
        work:'efficiency = (' + useful + ' / ' + total + ') × 100 = ' + sf(useful / total * 100) + '%' };
    }},

  { s:5, name:'Density', eq:'ρ = m / V', gen:function () {
      var m = ri(5, 400) / 10, V = ri(5, 90) / 1000;
      return { given:[['mass', m, 'kg'], ['volume', V, 'm³']],
        ask:['density', 'kg/m³'], ans:m / V,
        work:'ρ = m / V = ' + m + ' / ' + V + ' = ' + sf(m / V) + ' kg/m³' };
    }},

  { s:5, name:'Pressure', eq:'p = F / A', gen:function () {
      var F = ri(10, 90) * 10, A = ri(1, 60) / 100;
      return { given:[['force', F, 'N'], ['area', A, 'm²']],
        ask:['pressure', 'Pa'], ans:F / A,
        work:'p = F / A = ' + F + ' / ' + A + ' = ' + sf(F / A) + ' Pa' };
    }},

  { s:5, name:'Pressure in a liquid', eq:'p = h × ρ × g', gen:function () {
      var h = ri(2, 60), rho = pick([1000, 1030, 800, 13600]);
      return { given:[['depth', h, 'm'], ['density of liquid', rho, 'kg/m³'], ['gravitational field strength', 10, 'N/kg']],
        ask:['pressure difference', 'Pa'], ans:h * rho * 10,
        work:'p = h × ρ × g = ' + h + ' × ' + rho + ' × 10 = ' + sf(h * rho * 10) + ' Pa' };
    }},

  { s:5, name:'Specific heat capacity', eq:'ΔQ = m × c × ΔT', gen:function () {
      var m = ri(1, 50) / 10, c = pick([4200, 900, 385, 450, 2400]), dT = ri(5, 70);
      return { given:[['mass', m, 'kg'], ['specific heat capacity', c, 'J/(kg °C)'], ['temperature rise', dT, '°C']],
        ask:['energy transferred', 'J'], ans:m * c * dT,
        work:'ΔQ = m × c × ΔT = ' + m + ' × ' + c + ' × ' + dT + ' = ' + sf(m * c * dT) + ' J' };
    }},

  { s:5, name:'Celsius to kelvin', eq:'T (K) = θ (°C) + 273', p2:true, gen:function () {
      var th = ri(-200, 400);
      return { given:[['temperature', th, '°C']],
        ask:['temperature', 'K'], ans:th + 273,
        work:'T = θ + 273 = ' + th + ' + 273 = ' + (th + 273) + ' K' };
    }},

  { s:5, name:'Boyle’s law', eq:'p₁V₁ = p₂V₂', p2:true, gen:function () {
      var p1 = ri(1, 9) * 10000, V1 = ri(10, 90) / 100, V2 = ri(5, 80) / 100;
      return { given:[['initial pressure p₁', p1, 'Pa'], ['initial volume V₁', V1, 'm³'], ['final volume V₂', V2, 'm³']],
        ask:['final pressure p₂', 'Pa'], ans:p1 * V1 / V2,
        work:'p₁V₁ = p₂V₂\n' + p1 + ' × ' + V1 + ' = p₂ × ' + V2 +
             '\np₂ = ' + sf(p1 * V1) + ' / ' + V2 + ' = ' + sf(p1 * V1 / V2) + ' Pa' };
    }},

  { s:6, name:'Force on a conductor', eq:'F = B × I × l', p2:true, gen:function () {
      var B = ri(1, 40) / 100, I = ri(5, 90) / 10, l = ri(5, 60) / 100;
      return { given:[['magnetic flux density', B, 'T'], ['current', I, 'A'], ['length in the field', l, 'm']],
        ask:['force', 'N'], ans:B * I * l,
        work:'F = B × I × l = ' + B + ' × ' + I + ' × ' + l + ' = ' + sf(B * I * l) + ' N' };
    }},

  { s:6, name:'Transformer turns ratio', eq:'V_p / V_s = n_p / n_s', gen:function () {
      var np = ri(1, 20) * 50, ns = ri(1, 40) * 50, Vp = pick([12, 24, 230, 400]);
      return { given:[['primary turns n_p', np, ''], ['secondary turns n_s', ns, ''], ['primary voltage V_p', Vp, 'V']],
        ask:['secondary voltage V_s', 'V'], ans:Vp * ns / np,
        work:'V_p / V_s = n_p / n_s\nV_s = V_p × n_s / n_p = ' + Vp + ' × ' + ns + ' / ' + np +
             ' = ' + sf(Vp * ns / np) + ' V' };
    }},

  { s:6, name:'Ideal transformer current', eq:'V_p I_p = V_s I_s', gen:function () {
      var Vp = pick([230, 400, 25000]), Ip = ri(5, 200) / 10, Vs = pick([12, 50, 132000, 400000]);
      return { given:[['primary voltage', Vp, 'V'], ['primary current', Ip, 'A'], ['secondary voltage', Vs, 'V']],
        ask:['secondary current', 'A'], ans:Vp * Ip / Vs,
        work:'V_p × I_p = V_s × I_s\nI_s = (' + Vp + ' × ' + Ip + ') / ' + Vs + ' = ' + sf(Vp * Ip / Vs) + ' A' };
    }},

  { s:7, name:'Half-life', eq:'halve once per half-life', gen:function () {
      var A0 = pick([640, 800, 960, 1280, 512]), n = ri(2, 5), hl = ri(2, 12);
      return { given:[['initial activity', A0, 'Bq'], ['half-life', hl, 'hours'], ['time elapsed', n * hl, 'hours']],
        ask:['activity remaining', 'Bq'], ans:A0 / Math.pow(2, n),
        work:(n * hl) + ' / ' + hl + ' = ' + n + ' half-lives\n' + A0 + ' → ' +
             Array.apply(null, Array(n)).map(function (_, k) { return A0 / Math.pow(2, k + 1); }).join(' → ') + ' Bq' };
    }},

  { s:8, name:'Orbital speed', eq:'v = 2πr / T', gen:function () {
      var r = ri(7, 42) * 1e6, days = ri(1, 30);
      var T = days * 24 * 3600;
      return { given:[['orbital radius', r.toExponential(1), 'm'], ['orbital period', days, 'days']],
        ask:['orbital speed', 'm/s'], ans:2 * Math.PI * r / T,
        work:'T = ' + days + ' × 24 × 3600 = ' + T + ' s\nv = 2πr / T = (2 × π × ' + r.toExponential(1) +
             ') / ' + T + ' = ' + sf(2 * Math.PI * r / T) + ' m/s' };
    }},

  { s:8, name:'Hubble’s law', eq:'v = H₀ × d', gen:function () {
      var d = ri(1, 90) * 1e23;
      var H = 2.2e-18;
      return { given:[['distance to galaxy', d.toExponential(1), 'm'], ['Hubble constant', '2.2 × 10⁻¹⁸', 's⁻¹']],
        ask:['speed of recession', 'm/s'], ans:H * d,
        work:'v = H₀ × d = 2.2 × 10⁻¹⁸ × ' + d.toExponential(1) + ' = ' + (H * d).toExponential(2) + ' m/s' };
    }}

  ];
})();
