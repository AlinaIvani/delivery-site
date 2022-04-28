import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/MainPage.vue";
import OrderView from "@/views/OrderPage.vue";
import AdminView from "@/views/AdminPage.vue"
const routes = [
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "cart",
    component: OrderView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
