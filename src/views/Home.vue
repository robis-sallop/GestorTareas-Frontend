<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <h1>Gestor de Tareas</h1>
    <p>Esta aplicación permite gestionar tareas conectándose a una API REST.</p>
    <ul>
      <li>Crear tareas</li>
      <li>Listar tareas</li>
      <li>Editar y eliminar tareas</li>
    </ul>
  </div>
</template>

<script setup>
// No se requiere lógica por ahora
</script>



<style scoped>
.home {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
h1 {
  color: #42b983;
}
</style>