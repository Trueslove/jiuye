import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/style/index.scss"; // glob scss
// eslint-disable-next-line
import 'amfe-flexible';
Vue.config.productionTip = false;
// localStorage.setItem(
//   "userInfo",
//   JSON.stringify({
//     uid: "18759",
//     city: "泉州"
//   })
// );
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");