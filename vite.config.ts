import { defineConfig } from "vite";
import vinext from "vinext";
import { kvDataAdapter } from "@vinext/cloudflare/cache/kv-data-adapter";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Tailwind v4 runs as a Vite plugin on this path. `postcss.config.mjs` stays
  // in place for `next build` (still used for the Vercel deployment and local
  // `next dev`), so Vite is told to ignore PostCSS entirely — otherwise
  // Tailwind would run twice and `@import "tailwindcss"` resolves as a file.
  css: { postcss: { plugins: [] } },
  plugins: [
    tailwindcss(),
    // ISR needs a persistent cache in production; KV holds it (binding
    // VINEXT_KV_CACHE in wrangler.jsonc).
    vinext({ cache: { data: kvDataAdapter() } }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
