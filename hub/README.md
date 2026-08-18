# Revision Desk

The front door at the root of this repository. It links every study app here,
and fills each card in with the progress that app has already saved.

## How it knows what you have done

Every app stores its own state in `localStorage` under its own key. The desk is
served from the same origin as the apps, so it can read those keys directly.
Nothing is copied into a store of its own, nothing is synced, and the desk only
ever writes to an app's key when you restore a backup from the Backup panel.

`hub/js/registry.js` holds one entry per app: where it lives, how it should be
described, and a `read()` adapter that turns that app's private state shape into
the same small summary:

| field | meaning |
|---|---|
| `answered` / `correct` | questions attempted, and how many were right |
| `due` | scheduled reviews ready now, or `null` if the app has no scheduler |
| `streak` | consecutive days studied, or `null` if the app keeps no dates |
| `last` | when the app was last used, in ms, or `null` |
| `notes` | one or two extras for the third stat on the card |

Adapters must never throw. A half-written or corrupt save should read as a blank
subject, not a broken page — everything runs through `num()`, `obj()` and
`sum()`, which coerce whatever they are given.

The apps below are the source of truth for these shapes. They are read-only from
here, so if one of them changes its storage key or state shape, the matching
adapter has to change with it:

| Subject | Folder | Storage key |
|---|---|---|
| Biology | `biology/` | `bio4bi1.v1` |
| Chemistry | `chemistry/` | `igcse-chem-lab-v1` |
| Physics | `physics/` | `igcse-phys-4ph1-v1` |
| Geography | `geography/` | `igcse-geo.progress.v1` |
| Computer Science | `igcse-cs/` | `bitwise.igcse.v1` |
| Business Studies | `igcse/business/` | `bs0450.v1` |

## What to revise next

`needScore()` in `hub/js/main.js` ranks the subjects. A subject climbs when
reviews have piled up, when it has been left alone for a while, and when the
answers given so far were mostly wrong. A subject that has never been opened
goes straight to the top: an empty subject is the biggest gap there is.

## Backup

The Backup panel writes one JSON file holding every app's save, and restores it
into the same keys. It is the only way to carry progress to another browser or
device, since `localStorage` never leaves the machine it was written on. A
restore replaces the progress of every subject in the file and asks first.

## Adding an app

Add an entry to `APPS` in `hub/js/registry.js` with its folder, a hue, and a
`read()` adapter. The card, the totals, the ranking, and the backup all pick it
up from there. The number keys follow the order of the array.

## Running it

Static files, no build step, no dependencies. Open `index.html`, or serve the
repository root with any static server:

```
python3 -m http.server 8000
```
