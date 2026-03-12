export default defineNuxtConfig({
  pages: true,
  ssr: false,
  devtools: { enabled: false },
  css: [
    '@/assets/scss/main.scss',
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  plugins: ['~/plugins/vuetify.js'],
  components: true,
  build: {
    transpile: ['vuetify'],
  },
})