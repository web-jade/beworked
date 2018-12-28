import Vue from 'vue'
import App from './App.vue'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

import './plugins'

import router from './router'
import store from './store/index'

Vue.config.productionTip = false

new Vue({
  created () {
      let config = {
          apiKey: "AIzaSyCZ3-7sToeaszUlc2M8sqZOWZzD28tJ8Bo",
          authDomain: "beworked-275d8.firebaseapp.com",
          databaseURL: "https://beworked-275d8.firebaseio.com",
          projectId: "beworked-275d8",
          storageBucket: "beworked-275d8.appspot.com",
          messagingSenderId: "1012870655692"
      }
      firebase.initializeApp(config)
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
