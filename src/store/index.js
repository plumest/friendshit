import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"

import { auth } from './auth.module';

const API_PATH = process.env.VUE_APP_API_URL;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paths: []
  },
  mutations: {
    retrievePaths(state, { response }) {
      state.paths = response.data;
    },
    addPaths(state, { payload }) {
      state.paths.push(payload);
    },
  },
  actions: {
    async fetchPaths({ commit }) {
      await Axios.get(API_PATH)
          .then(res => commit("fetchPaths", { res }))
          .catch(err => alert(err));
    },
    async addPaths({ commit }, payload) {
      await Axios.post(API_PATH, payload)
          .then(() => commit("addPaths", { payload }))
          .catch(err => alert(err));
    },
  },
  modules: {
    auth
  }
})
