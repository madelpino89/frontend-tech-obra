
import "@mozaic-ds/vue-3/dist/mozaic-vue.bricoman.css";
//import "@mozaic-ds/tokens/build/scss/_tokens.scss";
import './assets/main.scss'
import MozaicVue from '@mozaic-ds/vue-3'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(MozaicVue)
app.mount('#app')
