import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#EA2425',
          secondary: '#048A81',
          accent: '#06D6A0',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      dark: {
        colors: {
          primary: '#EA2425',
          secondary: '#048A81',
          accent: '#06D6A0',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  } 
})
  nuxtApp.vueApp.use(vuetify)
  
})

