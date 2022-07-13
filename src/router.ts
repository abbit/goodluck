import { createRouter, createWebHistory } from "vue-router"
import HomePage from "./pages/HomePage.vue"
import GeneratePage from "./pages/GeneratePage.vue"

const routes = [
  {
    path: "/generate",
    component: GeneratePage,
  },
  {
    path: "/:state",
    component: HomePage,
  },
]

const history = createWebHistory()

export default createRouter({
  history,
  routes,
})
