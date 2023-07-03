import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from "@/locales";
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)

app.use(createPinia())
  .use(router)
  .use(i18n)
  .use(Notifications)

app.mount('#app')
