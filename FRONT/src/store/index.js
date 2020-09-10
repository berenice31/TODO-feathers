import { createStore } from 'vuex'
import axios from 'axios'

export const store = createStore({
  state: () => ({
    todos:[{
      name: 'tache 1',
      completed: false
    }],
  }),

  actions: {

    fetchTodos: async (store, name) => {

      try {
        console.log('fetch')
        const response = await axios.get('http://localhost:8080/tasks')
        
        store.commit('FETCH_TODOS', response.data)
        
        return response
      } catch (error) {
        return Promise.reject(error)
      }
  },

  addTodo: async ({ commit }, name) => {

    try {
      console.log("add is OK")
      const response = await axios.post('http://localhost:8080/tasks')

      store.commit('ADD_TODO', name)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  deleteTodo: async ( { commit }, todo) => {

    try {
      console.log("delete is OK")
      const response = await axios.post('http://localhost:8080/tasks')
      store.commit('DELETE_TODO', todo)
    } catch(error) {
      return Promise.reject(error)
    }
  },

  // deleteCompleted: async ( { commit }, todo ) => {

  //   try {
  //     console.log("delete completed is ok")
  //     const response = await axios.delete
  //   }
  // }

},

  mutations: {

    FETCH_TODOS: (state, tasks) => {
      state.todos.push(
        ...tasks
      )
    },

    ADD_TODO: (state, name) => {
      state.todos.push({
        name,
        completed: false,
      })
    },

    DELETE_TODO: (state, todo) => {
      const newtasks = state.todos.filter(i=>i !== todo)
      state.todos = newtasks

    }
  },

  getters: {

    todos: state => state.todos,
    completedTodos: state => state.todos.filter(todo => todo.completed),
    remainingTodos: state => state.todos.filter(todo => !todo.completed),
    remaining: state => state.todos.filter(todo => !todo.completed).length,
    completed: state => state.todos.filter(todo => todo.completed).length,

  }
})