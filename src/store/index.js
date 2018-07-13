import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './rootState'

Vue.use(Vuex)


const store =  new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store;


