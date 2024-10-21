import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import DetailView from '@/views/DetailView.vue'
import RosterView from '@/views/RosterView.vue'
import SearchView from '@/views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/activities',
      name: 'home',
      component: HomeView,
      meta: {
        enterClass: 'animate__animated animate__fadeInLeft',
        leaveClass: 'animate__animated animate__fadeOutRight'
      }
    },
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: {
        enterClass: 'animate__animated animate__fadeInUp',
        leaveClass: 'animate__animated animate__fadeOutDown',
        hideNavbar: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        enterClass: 'animate__animated animate__fadeInDown',
        leaveClass: 'animate__animated animate__fadeOutUp',
        hideNavbar: true
      }
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView,
      meta: {
        enterClass: 'animate__animated animate__fadeInRight',
        leaveClass: 'animate__animated animate__fadeOutLeft'
      }
    },
    {
      path: '/activities/:id',
      name: 'activity-details',
      component: DetailView,
      props: true,
      meta: {
        enterClass: 'animate__animated animate__fadeInUp',
        leaveClass: 'animate__animated animate__fadeOutDown'
      }
    },
    {
      path: '/activities/user/:userId/roster/:rosterId',
      name: 'RosterView',
      component: RosterView
    },
    {
      path: '/search',
      name: 'searchView',
      component: SearchView,
      meta: {
        enterClass: 'animate__animated animate__fadeInDown',
        leaveClass: 'animate__animated animate__fadeOutUp'
      }
    },

  ]
})

export default router
