// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src",
  modules: [
    '@nuxtjs/tailwindcss',
    '@kevinmarrec/nuxt-pwa',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],
  pwa: {
    workbox: {
      // the way to enable pwa is to remove "enabled: false" from below
      // enabled: false
    },
    manifest: {
      theme_color: "#fff",
      background_color: "#fff",
      display: "standalone",
      scope: "/",
      start_url: "/",
      name: "RCN Lagos Children Department",
      short_name: "RCN Kids",
      description: "Remnant Christian Network Lagos - Children Department",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icon-256x256.png",
          sizes: "256x256",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    },
    meta: {
      name: "Children Department",
      author: "Remnant Christian Network Lagos",
      description: "Remnant Christian Network Lagos - Children Department",
      theme_color: "#fff",
      lang: "en"
    }
  },
})
