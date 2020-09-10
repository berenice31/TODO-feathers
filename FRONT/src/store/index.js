import { createStore } from 'vuex'
import axios from 'axios'

export const store = createStore({
  state: () => ({
    todos:[{
      name: 'tache 1',
      completed: false
    }],
    editing: null,
    oldTodo: ''
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

  deleteCompleted: async ( { commit }, todo ) => {

    try {
      console.log("delete completed is ok")
      const response = await axios.post('http://localhost:8080/tasks')
      store.commit('DELETE_COMPLETED', response.data)
    } catch(error) {
      return Promise.reject(error)
    }
  },

  // editTodo: async({ commit }, todo) => {
  //   try {
  //     console.log("edit ok")
  //     const response = await axios.post('http://localhost:8080/tasks')
  //     store.commit('EDIT_TODO', todo)
  //   } catch(error) {
  //     return Promise.reject(error)
  //   }
  // },

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

    },

    DELETE_COMPLETED: (state, tasks) => {
      const newtasks = state.todos.filter(todo => !todo.completed)
      state.todos = newtasks
    },

    // EDIT_TODO: (state, todo) => {
    //   state.editing = todo;
    //   state.oldTodo = todo.name;
    // }
  },

  getters: {

    todos: state => state.todos,
    completedTodos: state => state.todos.filter(todo => todo.completed),
    remainingTodos: state => state.todos.filter(todo => !todo.completed),
    remaining: state => state.todos.filter(todo => !todo.completed).length,
    completed: state => state.todos.filter(todo => todo.completed).length,
  }
})