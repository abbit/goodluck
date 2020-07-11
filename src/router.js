import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import GeneratePage from "./views/GeneratePage.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/generate",
    component: GeneratePage,
  },
];

const history = createWebHistory();

export default createRouter({
  history,
  routes,
});
