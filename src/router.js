import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/index'
import NotFound from './pages/notFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFound
    },
  ]
})