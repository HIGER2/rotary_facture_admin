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
      apiBase: process.env.API_BASE
    },

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
        '6501-149-33-219-229.ngrok-free.app',
      ]
    }
  },
  app: {
    
    head: {
      meta: [
        { charset: 'utf-8' },
      ],
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
    '@nuxt/test-utils',
    '@pinia/nuxt', 
    'nuxt-toastify',
    '@nuxtjs/i18n'
  ],
  
  i18n: {
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'pt', name: 'Portugais', file: 'pt.json' },
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