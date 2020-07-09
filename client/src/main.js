import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

import { Token } from './Token';

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDkjq04qqQ5oU1Mlbu5Xcd4RyfTVIkoWU8',
    libraries: 'places',
  }
})

router.beforeEach(async (to, from, next) => {
  const verified = await Token.verifyToken();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (verified !== 'Success') {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.matched.some(record => record.meta.requiresTest)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (verified === 'Success') {
      next({
        path: '/admin',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

