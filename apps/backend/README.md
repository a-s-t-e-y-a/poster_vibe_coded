```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
env

CLOUDFLARE_D1_TOKEN="xr5rCVHShj9xAFQRnxOI7J6Ue_lADOkUU_6-R1fM"
CLOUDFLARE_ACCOUNT_ID="b640e68a181b593aeabb1a8588ced478"
CLOUDFLARE_DATABASE_ID="3058e3a7-71c2-4f97-b7aa-0739b6c4c706"