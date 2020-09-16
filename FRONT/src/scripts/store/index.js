import client from '../api/use-client.js'
import { createStore } from 'vuex'
import axios from 'axios'

export const store = createStore({
  state: () => ({
    todos:[],
    editing: null,
    oldTodo: '',
    newTodo: ''
  }),

  actions: {
    fetchTodos: async ({ commit }, name) => {
      try {
        console.log('fetch')
        const response = await client.service('tasks').find()

        commit('FETCH_TODOS', response.data)
        
        return response
      } catch (error) {
        return Promise.reject(error)
      }
  },

  addTodo: async ({ commit }, name) => {
    try {
      console.log("add is OK")
      // const response = await client.service('tasks').create
      // commit('ADD_TODO', name)

      // Si tu passes juste name à ton action, 
      // il faut que tu crées l'objet à envoyer au serveur : 

      const data = { name }
      const response = await client.service('tasks').create(data)

      console.log(`TODO`, response)

      commit('ADD_TODO', response)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  deleteTodo: async ({ commit }, todo) => {
    try {
      console.log("delete is OK")
      // const response = await client.service('tasks').remove
      // commit('DELETE_TODO', todo)

      // Ici tu dois supprimer en passant l'_id de la todo au serveur
      const response = await client.service('tasks').remove(todo._id)

      commit('DELETE_TODO', response)
    } catch(error) {
      return Promise.reject(error)
    }
  },

  deleteCompleted: async ({ dispatch, state }) => {
    try {
      console.log("delete completed is ok")
      // const response = await client.service('tasks').remove
      // commit('DELETE_COMPLETED', response.data)

      // Il vaut mieux supprimer chaque todo une par une en utilisant ton autre action deleteTodo
      const completed = state.todos.filter(todo => todo.completed)

      for (let i = 0; i < completed.length; i++) {
        dispatch('deleteTodo', completed[i])
      }
    } catch(error) {
      return Promise.reject(error)
    }
  },

  changeTodo: async({ commit }, todo) => {
    try {
      console.log("edit ok", todo)
      // const response = await client.service('tasks').update
      // commit('CHANGE_TODO', todo)
      
      // patch sert à mettre à jour tandis ce qu'"update" va remplacer complètement l'item
      const response = await client.service('tasks').patch(todo._id, todo)

      commit('PATCH_TODO', response)
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

    ADD_TODO: (state, todo) => {
      // state.todos.push({
      //   name,
      //   completed: false,
      // })
      state.todos.push(todo);
    },

    DELETE_TODO: (state, todo) => {
      const newtasks = state.todos.filter(item => item._id !== todo._id)

      state.todos = newtasks
    },

    PATCH_TODO: (state, todo) => {
      const todoIndex = state.todos.findIndex(item => item._id === todo._id)

      if (todoIndex >= 0) {
        // Tu merge l'ancienne todo avec la nouvelle
        const newTodo = Object.assign(state.todos[todoIndex], todo) 
        // Tu remplaces la todo à l'index où elle se trouve actuellement par la nouvelle 
        state.todos.splice(todoIndex, 1, newTodo)
      } else {
        console.error(`La todo n'a pas été trouvée`)
      }
    },

    // Tu n'as plus besoin de cette mutation du coup
    // DELETE_COMPLETED: (state, tasks) => {
    //   const newtasks = state.todos.filter(todo => !todo.completed)
      
    //   state.todos = newtasks
    // },

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