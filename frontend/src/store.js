import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    token: '',
    userid: '',
    user_type: 0
  },
  getters: {
    getLogin(state) {
      return typeof state.token === 'string' && state.token !== ''
    },
    getToken(state) {
      return state.token
    },
    getUserId(state) {
      return state.userid
    },
    getUserType(state) {
      return state.user_type
    }
  },
  actions: {
    loginSession(context, data) {
      sessionStorage.setItem('session', JSON.stringify(data))
      context.commit('setSession', data)
    },
    getSession(context) {
      const session = sessionStorage.getItem('session')
      if (session && typeof session === 'string' && session !== '') {
        const data = JSON.parse(session);
        context.commit('setSession', data)
        return true;
      }
      return false;
    },
    logoutSession(context) {
      context.commit('logoutSession')
    }
  },
  mutations: {
    setSession(state, n) {
      state.token = n.token
      state.userid = n.userid
      state.user_type = n.user_type
    },
    logoutSession(state) {
      sessionStorage.clear()
      state.token = ''
      state.userid = ''
      state.user_type = 0
    }
  }
})