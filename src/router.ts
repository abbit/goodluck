import { createRouter, createWebHistory } from "vue-router"
import HomePage from "./pages/HomePage.vue"
import GeneratePage from "./pages/GeneratePage.vue"
import RandomPage from "./pages/RandomPage.vue"

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/generate",
    component: GeneratePage,
  },
  {
    path: "/:state",
    component: RandomPage,
  },
]

const history = createWebHistory()

export default createRouter({
  history,
  routes,
})
