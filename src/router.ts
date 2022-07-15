import { createRouter, createWebHistory } from "vue-router"
import HomePage from "./pages/HomePage.vue"
import GeneratePage from "./pages/GeneratePage.vue"
import LuckPage from "./pages/LuckPage.vue"

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
    component: LuckPage,
  },
]

const history = createWebHistory()

export default createRouter({
  history,
  routes,
})
