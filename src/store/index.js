import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import {webClientInstance} from "../services/axios-create";

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
        const { result: {pathHistory} } = data
      //  commit("fetchPaths", {data})
        return pathHistory[pathHistory.length - 1]
      } catch(err) {
        alert(err)
      }
    },
    async fetchSingleBook(_, { bookId }) {
      try {
        const { data } = await webClientInstance.get(`/books/${bookId}`)
        const { result } = data
        return result
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
