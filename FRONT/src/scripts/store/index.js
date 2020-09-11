import client from '../api/use-client.js'
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
        const response = await client.service('tasks').get
        store.commit('FETCH_TODOS', response.data)
        
        return response
      } catch (error) {
        return Promise.reject(error)
      }
  },

  addTodo: async ({ commit }, name) => {

    try {
      console.log("add is OK")
      const response = await client.service('tasks').create
      store.commit('ADD_TODO', name)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  deleteTodo: async ( { commit }, todo) => {

    try {
      console.log("delete is OK")
      const response = await client.service('tasks').remove
      store.commit('DELETE_TODO', todo)
    } catch(error) {
      return Promise.reject(error)
    }
  },

  deleteCompleted: async ( { commit }, todo ) => {

    try {
      console.log("delete completed is ok")
      const response = await client.service('tasks').remove
      store.commit('DELETE_COMPLETED', response.data)
    } catch(error) {
      return Promise.reject(error)
    }
  },

  changeTodo: async({ commit }, todo) => {
    try {
      console.log("edit ok")
      const response = await client.service('tasks').update
      store.commit('CHANGE_TODO', todo)
    } catch(error) {
      return Promise.reject(error)
    }
  },

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

    CHANGE_TODO: (state, todo) => {
      state.editing = todo;
      state.oldTodo = todo.name;
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

export default store