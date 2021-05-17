/* eslint-disable no-trailing-spaces */
// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      route('Dashboard'),

      // Videos
      route('Videos', null, 'videos'),

      // Geräte
      route('Devices', null, 'devices'),

      // Links
      route('Links', null, 'links'),

      // Logs
      route('Logs', null, 'logs'),

      // Pages
      route('Timeline', null, 'components/timeline'),
      route('UserProfile', null, 'components/profile'),

      // Components
      route('Buttons', null, 'components/buttons'),
      route('Grid', null, 'components/grid'),
      route('Tabs', null, 'components/tabs'),
      route('Notifications', null, 'components/notifications'),
      route('Icons', null, 'components/icons'),
      route('Typography', null, 'components/typography'),

      // Forms
      route('Regular Forms', null, 'forms/regular'),
      route('Extended Forms', null, 'forms/extended'),
      route('Validation Forms', null, 'forms/validation'),
      route('Wizard', null, 'forms/wizard'),

      // Tables
      route('Regular Tables', null, 'tables/regular'),
      route('Extended Tables', null, 'tables/extended'),
      route('Data Tables', null, 'tables/data-tables'),

      // Maps
      route('Google Maps', null, 'maps/google'),
      route('Fullscreen Map', null, 'maps/fullscreen'),

      route('Rtl', null, 'pages/rtl'),
      route('Widgets', null, 'widgets'),
      route('Charts', null, 'charts'),
      route('Calendar', null, 'calendar'),
    ]),
    layout('Page', [
      route('Error', null, 'error'),
      route('Lock', null, 'lock'),
      route('Login', null, 'login'),
      route('Pricing', null, 'pricing'),
      route('Register', null, 'register'),
    ], '/pages'),
  ],
})

router.beforeEach((to, from, next) => {
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
