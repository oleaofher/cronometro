export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&display=swap' }
      ]
    }
  }
})
