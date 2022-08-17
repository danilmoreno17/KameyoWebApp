import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueToast from "vue-toast-notification";

import "devextreme/dist/css/dx.material.blue.light.css";

// import IndexComponent from './components/admin/dashboard/IndexComponent.vue'
// import DummyView from './components/admin/dashboard/DummyView.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueToast);

app.mount("#app");
