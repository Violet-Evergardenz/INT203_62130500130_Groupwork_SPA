import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseRow from './components/BaseRow.vue'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

app.component('base-button',BaseButton)
app.component('base-row',BaseRow)

app.use(router).mount('#app')



//createApp(App).use(router).mount('#app')
