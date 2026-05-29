# Alibaba CoCreate Pitch 2026 Demo Slice

This is a no-build Vue 3 CDN demo for the `ai_startup_pitch` track. It presents an operational AI commerce console for Accio Work: product concept, storefront copy, sourcing workflow, supplier risk, assisted work steps, and live ROI/unit economics.

## Preview

Run a static server from this folder:

```powershell
cd C:\git\websites\alibaba_cocreate_pitch_2026
node serve.mjs
```

Open:

```text
http://127.0.0.1:8787/
```

Opening `index.html` directly as `file://` will show a local-server notice because the SFC loader fetches component files from `src/`.

## Files

- `index.html` boots Vue 3, UnoCSS runtime, and `vue3-sfc-loader` from CDN.
- `src/data.js` contains demo products, suppliers, workflow steps, and Accio Work actions.
- `src/App.vue` coordinates state, scenario controls, supplier selection, and simulated agent progress.
- `src/components/*.vue` contains the storefront concept, economics, supplier risk, workflow, and assisted-step panels.

## QA Notes

- No build step or package install is required.
- Internet access is needed for CDN dependencies unless local vendor copies are added later.
- The UI is seeded with demo data only; buttons simulate Accio Work actions in local state.
