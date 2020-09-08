<template>
<section class="todoapp">
  <header class="header">
    <h1> todos</h1>
    <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTodo" @keyup.enter="addTodo">
  </header>
  <div class="main">
    <ul class="todo-list">
      <li class="todo" v-for="todo in filteredTodos" v-bind:class="{completed: todo.completed}">
        <div class="view">
          <input type="checkbox" v-model="todo.completed" class="toggle">
          <label for=""> {{todo.name}}</label>
        </div>
      </li>
    </ul>
  </div>
  <footer class="footer">
<span class="todo-count"><strong>{{ remaining }}</strong> Tâches à faire</span>
<ul class="filters">
  <li>
    <a href="#" :class="{selected: filter ==='all'}" @click.prevent="filter = 'all'"> Toutes</a>
  </li>
  <li>
    <a href="#" :class="{selected: filter ==='to do'}" @click.prevent="filter = 'todo'"> A faire</a>
  </li>
  <li>
    <a href="#" :class="{selected: filter ==='done'}" @click.prevent="filter = 'done'"> Faites</a>
  </li>
</ul>
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
      filter:'all'
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
    },
    filteredTodos () {
      if (this.filter === 'todo') {
        return this.todos.filter(todo => !todo.completed)
      } else if(this.filter === 'done') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    }
  }
}
</script>

<style src="./todos.css"></style>