import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    todos:[{
      name: 'tache 1',
      completed: false
    }],
  },

  actions: {
    fetchTodos: async (store, name) => {

      try {
      const response = await axios.get('http://localhost:8080/tasks')
        store.commit(FETCH_TODOS, name)

      } catch (error) {
        return Promise.reject(error)
      }
  },
},

  mutations: {
    FETCH_TODOS: (state, name) => {
      state.push({
        name,
        completed: false
      })
    }
  },

  getters: {
    todos: state => state.todos

  }
})