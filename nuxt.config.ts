// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
   app: {
    
     head: {
        link: [
       {
         href: "https://unicons.iconscout.com/release/v4.0.8/css/line.css",
           rel:"stylesheet"
         }
       ],
     }

  },
  modules: ['@nuxt/image', '@nuxt/scripts', '@nuxt/test-utils']
})