import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { createVuetify } from 'vuetify'
import 'vuetify/styles'



const app = createApp(App)
const vuetify = createVuetify()

app.use(router)
app.use(store)
app.use(vuetify)
app.mount("#app")
