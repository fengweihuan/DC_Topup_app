import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home'
// import fromWord from '@/components/HelloFromVux'
// import Orderlist from '@/components/orderlist'
// import Member from '@/components/member'
// import Mine from '@/components/mine'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      redirect: '/home/orderlist',
      name: 'home',
      meta: {
        auth: true
      },
      component: (resolve) => {
        require(['@/components/home'], resolve)
      },
      children: [
        {
          path: 'orderlist',
          component: (resolve) => {
            require(['@/components/orderlist'], resolve)
          },
          meta: {
            // auth: true
          }
        },
        {
          path: 'member',
          component: (resolve) => {
            require(['@/components/member'], resolve)
          }
        },
        {
          path: 'mine',
          component: (resolve) => {
            require(['@/components/mine'], resolve)
          }
        }
      ]
    },
    {
      path: '/fromWord',
      name: 'fromWord',
      component: (resolve) => {
        require(['@/components/HelloFromVux'], resolve)
      }
    }
  ]
})
