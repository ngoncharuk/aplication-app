import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'
import { Socket } from "phoenix-socket";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    machines: [],
    loading: false,
    socketOpen: false,
  },
  mutations: {
    getMachinesAsync(state) {
      state.loading = true;
    },
    getMachinesSuccess(state, data) {
      state.machines = data.data;
    },
    getMachinesError() {
      // TODO: error handling needed
    },
    getMachineDetailsAsync(state) {
      state.loading = true;
    },
    getMachineDetailsSuccess(state, data) {
      state.machine = data.data;
    },
    getMachineDetailsError() {
      // TODO: error handling needed
    },
    onSocketEvent(state, data) {
      if (state.machines.data) {
        state.machines.data.forEach((item, index) => {
          if (item.id === data.machine_id){
            state.machines.data[index].status = data.status;
          }
        });
      }
      if (state.machine.data && state.machine.data.id === data.machine_id) {
        state.machine.data.events.push({
          status: data.status,
          timestamp: data.timestamp
        });
      }
    },
  },
  actions: {
    getMachines ({ commit }) {
      commit('getMachinesAsync');
        axios.get('https://machinestream.herokuapp.com/api/v1/machines')
          .then(function (response) {
            commit('getMachinesSuccess', response);
          })
          .catch(function (error) {
            commit('getMachinesError', error);
          });
    },
    getMachineDetails ({ commit }, machine_id) {
      commit('getMachineDetailsAsync');
        axios.get(`https://machinestream.herokuapp.com/api/v1/machines/${machine_id}`)
          .then(function (response) {
            commit('getMachineDetailsSuccess', response);
          })
          .catch(function (error) {
            commit('getMachineDetailsError', error);
          });
    },
    socketOpen({ commit }, isOpen) {
      commit('socketOpen', isOpen);
    },
    connectWebSocket({ commit }) {
      const socket = new Socket("ws://machinestream.herokuapp.com/api/v1/events");
      socket.connect();

      const channel = socket.channel("events", {});
      channel.join();
      channel.on("new", event => {
        commit('onSocketEvent', event);
      });
    },
  },
  plugins: [vuexLocal.plugin],
})
