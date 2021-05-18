import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home.vue";
import Register from "../views/Register";
import BookSpecific from "../views/Draw";
import CreateBook from "../views/CreateBook";
import AllBook from "../views/AllBook";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/books/create",
    component: CreateBook,
  },
  {
    path: "/books",
    component: AllBook,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Draw.vue"),
  },
  {
    path: "/books/:id",
    name: "BookSpecific",
    component: BookSpecific,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
