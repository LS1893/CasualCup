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
          primary: '#869aad',
          secondary: '#dcf0f0',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      dark: {
        colors: {
          primary: '#04203a',
          secondary: '#dcf0f0',
          accent: '#82B1FF',
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

