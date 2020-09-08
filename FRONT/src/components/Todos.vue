<template>
<section class="todoapp">
  <header class="header">
    <h1> todos</h1>
    <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTodo" @keyup.enter="addTodo">
  </header>
  <div class="main">
    <ul class="todo-list">
      <li class="todo" v-for="todo in todos" v-bind:class="{completed: todo.completed}">
        <div class="view">
          <input type="checkbox" v-model="todo.completed" class="toggle">
          <label for=""> {{todo.name}}</label>
        </div>
      </li>
    </ul>
  </div>
  <footer class="footer">
<span class="todo-count"><strong>{{ remaining }}</strong> Tâches à faire</span>
  </footer>
</section>

</template>

<script>
export default {
  data () {
    return {
      todos:[{
        name: 'Tache de test',
        completed: false,
      }],
      newTodo:'',
    }
  },
  methods: {
    addTodo(){
      this.todos.push({
        name: this.newTodo,
        completed: false,
      })
      this.newTodo='';
    }
  },
  computed: {
    remaining () {
      return this.todos.filter(todo => !todo.completed).length
    }
  }
}
</script>

<style src="./todos.css"></style>