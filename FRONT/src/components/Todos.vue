<template>
<section class="todoapp">
  <header class="header">
    <h1> todos</h1>
    <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTodo">
  </header>
  <div class="main">
    <ul class="todo-list">
      <li class="todo" v-for="todo in todos">
        <div class="view">
          <label for=""> {{todo.name}}</label>
        </div>
      </li>
    </ul>
  </div>
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
  }
}
</script>

<style src="./todos.css"></style>