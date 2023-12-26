import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vue3GoogleLogin from "vue3-google-login";
import "bootstrap/dist/css/bootstrap.css";

createApp(App)
  .use(router)
  .use(store)
  .use(vue3GoogleLogin, {
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID, // Pass your Google client ID here
  })
  .mount("#app");
