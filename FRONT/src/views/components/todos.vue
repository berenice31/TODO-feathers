<template>
  <section class="todoapp">
    <header class="header">
      <h1> todos</h1>

      <input 
        type="text"
        class="new-todo"
        placeholder="Ajouter une tâche"
        v-model="newTodo"
        @keyup.enter="addTodo(newTodo)"
      >

    </header>

    <div class="main">

      <input
        type="checkbox"
        class="toggle-all"
        v-model="allDone"
      >

      <ul
        class="todo-list"
      >

    <todo 
      v-for="todo in filteredTodos"
      :key="todo._id"
      :todo="todo"
    />

      </ul>
    </div>

    <footer
      class="footer"
      v-show="hasTodos"
    >

      <span
        class="todo-count"
      >
        <strong>
          {{ remaining }}
        </strong>
          Tâches à faire
      </span>

      <ul class="filters">

        <li>
          <a 
            href="#"
            :class="{selected: filter ==='all'}"
            @click.prevent="filter = 'all'"
          >
            Toutes
          </a>
        </li>

        <li>
          <a
            href="#"
            :class="{selected: filter ==='to do'}"
            @click.prevent="filter = 'todo'"
          >
            A faire
          </a>
        </li>

        <li>
          <a
            href="#"
            :class="{selected: filter ==='done'}"
            @click.prevent="filter = 'done'"
          >
            Faites
          </a>
        </li>

      </ul>

      <button
        class="clear-completed"
        v-show="completed"
        @click.prevent="deleteCompleted"
      >
        Supprimer les tâches finies
      </button>

    </footer>
  </section>

</template>


<script>
import todo from './todo';
import { mapActions, mapGetters } from 'vuex';

export default {
  
  components: {
    todo
  },
  mounted () {
   this.fetchTodos()
  },


  data () {
    return {
      newTodo:'',
      filter:'all',
      editing: null,
      oldTodo: ''
    }
  },

  methods: {

    ...mapActions({
      addTodo: 'addTodo',
      fetchTodos: 'fetchTodos',
      deleteCompleted: 'deleteCompleted',
      changeTodo: 'changeTodo'
    }),
  },

  computed: {
    ...mapGetters({
      todos: 'todos',
      completed: 'completed',
      remaining: 'remaining',
      completedTodos: 'completedTodos',
      remainingTodos: 'remainingTodos'
    }),

    allDone: {
      get () {
        return this.remaining === 0
      },
      set (value) {
        if (value === true) {
          this.todos.forEach( todo => {
            todo.completed = true
          })
        } else {
          this.todos.forEach( todo => {
            todo.completed = false
          })
        }
      }
    },

    hasTodos () {
      return this.todos.length > 0
    },

    filteredTodos () {
      if (this.filter === 'todo') {
        return this.todos.filter(todo => !todo.completed)
      } else if(this.filter === 'done') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    }
  },

  directives: {
    focus (el, value) {
      if (value) {
          el.focus()
        }
      }
    }
  }
</script>

<style src="./todos.css"></style>