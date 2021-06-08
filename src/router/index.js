import { createRouter, createWebHashHistory } from 'vue-router'
import home from "@/components/home/home";
import Login from "@/components/user/Login";
import Mine from "@/components/user/Mine";
import Items from "@/components/items/Items";

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/user',
    component: Mine
  },
  {
    path: '/items/:id',
    component: Items
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
