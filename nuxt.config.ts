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
      apiBase: 'http://api.facturation.rotary-district9101.org/api'
    }
  },
   router: {
    options: {
      // hashMode: true
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: [
        'localhost',
        'a1f0-105-235-112-130.ngrok-free.app',
        '5a08-213-136-109-131.ngrok-free.app'
      ]
    }
  },
   app: {
    
    head: {
        link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      {
        href: "https://unicons.iconscout.com/release/v4.0.8/css/line.css",
          rel:"stylesheet"
        }
      ],
    }

  },
 
  modules: [
    '@nuxt/image', '@nuxt/scripts', // '@nuxt/ui'
    '@nuxt/test-utils', '@pinia/nuxt', 
    'nuxt-toastify',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json' },
      // { code: 'en', name: 'English', file: 'en.json' },
      // { code: 'pt', name: 'Portugais', file: 'pt.json' },
    ],
    defaultLocale: 'fr',
    langDir: 'locales',
    lazy: true,
    },
    toastify: {
     autoClose: 2000,
     position: 'top-right',
     theme: 'light',
   },
})