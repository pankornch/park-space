import Vue from 'vue'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


Vue.use(Vuex)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import io from 'socket.io-client';
const URL = 'http://localhost:5000';
const URL_IO = 'http://localhost:5050';


import { Token } from '../Token';

export default new Vuex.Store({
  state: {
    socket: io(`${URL_IO}`),
    api: '',
    view: '',
    dense: ''
  },

  mutations: {

    SET_API(state, data) {
      state.api = data;
    },

    SET_VIEW(state, data) {
      const { parking, input } = data;
      state.view = { ...parking, ...input }
    },

    SET_STATUS(state, token) {
      Token.setToken(token);
    },

    SET_DENSE(state, data) {
      state.dense = data;
    }
  },


  actions: {
    getAPI(context) {
      axios.get(`${URL}/api`).then(res => {
        context.commit('SET_API', res.data);
      })
    },

    async getView(context, path) {
      axios.get(`${URL}/api/${path}`).then(res => {
        context.getters.getterSocket.emit('view', path)
          .on(`query_${path}`, data => {
            context.commit('SET_VIEW', { parking: res.data, input: data })
          })
      })
    },

    getlogin(context, data) {
      axios.post(`${URL}/auth/login`, data).then(res => {
        context.commit('SET_STATUS', res.data)
        location.reload();
      });
    },

    getDense(context) {
      let socket = context.getters.getterSocket;
      socket.emit('dense').on('dense', data => {
        context.commit('SET_DENSE', data);
      });
    }

  },


  getters: {
    getterAPI(state) {
      return state.api;
    },

    getterView(state) {
      return state.view;
    },

    getterSocket(state) {
      return state.socket;
    },

    getterDense(state) {
      return state.dense;
    }
  },
  modules: {

  }
})
