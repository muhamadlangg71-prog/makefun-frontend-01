# make.fun frontend

A static, dependency-free client for the make.fun public API.

Run `node serve.ts` and visit http://localhost:8080. Use `--port 8081` to choose another port.

Routes: `#/`, `#/bounty/<slug>`, `#/bounty/<slug>/leaderboard`, and `#/u/<handle>`.

The client uses one GET per view and revalidates cached JSON with ETags. Leaderboards render at most 50 entries at a time. All API text is escaped and descriptions remain plain text.

After capturing the three live-data JPEGs listed in shots.json, run:

```
MAKEFUN_OUTPUT_DIR=out node main.ts
```

The deterministic packaging script copies the app and screenshots and builds the kit dossier. It performs no network requests.

The interface uses system fonts, UTC dates, deadline-based entry closure, and a single-column mobile layout. It contains no authentication, transaction, or write operations.

Accessibility includes semantic headings and tables, labeled search and pagination, keyboard focus indicators, and reduced-motion support.
