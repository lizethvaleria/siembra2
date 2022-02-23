import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve, join } from "path";

const pathAliasMap = {
  "@/": "/src/",
};

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "./src/assets/",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@root": resolve(__dirname),
    },
  },
});
