<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div id="app">
    <nav v-if="route.path !== '/login'">
      <router-link to="/">Inicio</router-link>
      <router-link to="/crear-tarea">Crear Tarea</router-link>
      <router-link to="/tareas">Listado de Tareas</router-link>
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  background: #42b983;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}
nav a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}
nav a.router-link-exact-active {
  background: #2c8f6b;
}
.logout-btn {
  background: #d32f2f;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #b71c1c;
}
</style>