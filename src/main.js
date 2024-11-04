import './assets/main.css'
import '@he-tree/vue/style/default.css'
import '@he-tree/vue/style/material-design.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
