// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  // ssr: false,
  pages: true,
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt"],
});
