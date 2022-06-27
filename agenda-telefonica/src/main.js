import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BalmUI, { UiCheckbox, UiFormField } from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';
import Maska from 'maska'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(BalmUI); // Mandatory
app.use(BalmUIPlus); // Optional
app.use(UiFormField);
app.use(UiCheckbox);
app.use(Maska);

app.mount('#app')
