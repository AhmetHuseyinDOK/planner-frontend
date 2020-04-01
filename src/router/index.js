import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewPlan from '../views/NewPlan';
import RegisterToPlan from '../views/RegisterToPlan.vue'
import Detail from '../views/Detail.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-plan',
    name: 'NewPlan',
    component: NewPlan
  },
  {
    path: '/register/:id',
    name: 'Register',
    component: RegisterToPlan
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
