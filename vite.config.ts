import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      globalize$: path.resolve(
        __dirname,
        "node_modules/globalize/dist/globalize.js"
      ),
      globalize: path.resolve(
        __dirname,
        "node_modules/globalize/dist/globalize"
      ),
      cldr$: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr.js"),
      cldr: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr"),
    },
    extensions: [".ts", ".js", ".json"],
  },
  build: {
    target: "esnext",
    rollupOptions: {
      treeshake: false,
    },
  },
});
