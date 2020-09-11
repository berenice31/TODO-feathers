<template>
 <li
          class="todo"
          v-bind:class="{
            completed: todo.completed,
            editing: editing && todo._id === editing._id
          }"
          :key="todo._id"
        >

          <div class="view">

            <input
              type="checkbox"
              v-model="todo.completed"
              class="toggle"
            >

            <label
              @dblclick="editTodo(todo)"
            >
              {{todo.name}}
            </label>

            <button
            class="destroy"
            @click.prevent="deleteTodo(todo)"
            >
            </button>

          </div>

          <input  
            v-if="editing"
            type="text"
            class="edit"
            v-model="editing.name"
            @keyup.enter="doneEdit"
            @blur="doneEdit"
            @keyup.esc="cancelEdit"
            v-focus="editing && todo._id === editing._id"
          >

        </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  
props: {
    todo: {
      type: Object,
      required: true,
    },
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
      deleteTodo: 'deleteTodo',
      changeTodo: 'changeTodo'
    }),


    editTodo (todo) {
      this.editing = Object.assign({}, todo)
      this.oldTodo = todo.name
    },

    doneEdit () {
      console.log('editing', this.editing)
      this.changeTodo(this.editing)

      this.editing = null
    },

    cancelEdit () {
      if (this.editing.name !== this.oldTodo) {
        this.editing.name = this.oldTodo
      }
      this.doneEdit()
    }
  },

  computed: {
    ...mapGetters({
      todos: 'todos',
      completed: 'completed',
    }),
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