import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"

import { auth } from './auth.module';

const API_PATH = process.env.VUE_APP_API_URL;

const webClientInstance = Axios.create({
  baseURL: API_PATH
});

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
    async fetchPaths(_, { bookId }) {
      try {
        const { data } = await webClientInstance.get(`/books/${bookId}`)
        console.log(data)
        const { result: {pathHistory} } = data
      //  commit("fetchPaths", {data})
        return pathHistory[pathHistory.length - 1]
      } catch(err) {
        alert(err)
      }
    },
    async addPaths({ commit }, payload) {
      const { bookId, paths } = payload
      await webClientInstance.put(`/books/${bookId}`, {
        paths
      })
          .then(() => commit("addPaths", { payload }))
          .catch(err => alert(err));
    },
  },
  modules: {
    auth
  }
})
