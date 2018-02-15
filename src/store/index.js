import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    support: true,
    message: '',
    log: []
  },
  mutations: {
    push (state, msg) {
      if (state.message !== '') {
        state.message += '\n'
      }
      state.message += msg
    },
    updateMessage (state, msg) {
      state.message = msg
    },
    support (state, support) {
      state.support = support
    },
    log (state, message) {
      if (typeof message === 'string') {
        message = {message, type: 'info'}
      }
      state.log.push({
        message: message.message,
        type: message.type || 'info',
        key: Symbol('msg')
      })
    }
  }
})
