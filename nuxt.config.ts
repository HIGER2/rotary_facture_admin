// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr:false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: {
  strict: false
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://api.facturation.rotary-district9101.org'
    }
  },
   router: {
    options: {
      hashMode: true
    }
  },
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
 
  modules: ['@nuxt/image', '@nuxt/scripts', // '@nuxt/ui'
    '@nuxt/test-utils', '@pinia/nuxt', 'nuxt-toastify'],
    toastify: {
     autoClose: 2000,
     position: 'bottom-right',
     theme: 'light',
   },
})