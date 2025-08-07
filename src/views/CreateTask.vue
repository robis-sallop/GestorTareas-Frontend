<template>
  <div class="create-task">
    <h2>Crear Nueva Tarea</h2>
    <form @submit.prevent="crearTarea">
      <div>
        <label for="titulo">Título:</label>
        <input id="titulo" v-model="titulo" required />
      </div>
      <div>
        <label for="detalle">Detalle:</label>
        <textarea id="detalle" v-model="detalle" required></textarea>
      </div>
      <div>
        <label for="estado">Estado:</label>
        <select id="estado" v-model="estado" required>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select>
      </div>
      <button type="submit">Crear tarea</button>
      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
//import axios from 'axios'
import api from '../services/api'

const titulo = ref('')
const detalle = ref('')
const estado = ref('pendiente')
const mensaje = ref('')

const crearTarea = async () => {
  const nuevaTarea = {
    titulo: titulo.value,
    detalle: detalle.value,
    estado: estado.value
  }
  console.log('Nueva tarea:', JSON.stringify(nuevaTarea, null, 2));
  try {
    await api.post('http://localhost:3000/api/tareas', nuevaTarea)
    mensaje.value = 'Tarea creada exitosamente.'
    titulo.value = ''
    detalle.value = ''
    estado.value = 'pendiente'
  } catch (error) {
    mensaje.value = 'Error al crear la tarea: '+nuevaTarea.title
  }
}
</script>

<style scoped>
.create-task {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
form > div {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
input, textarea, select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.mensaje {
  margin-top: 1rem;
  color: #42b983;
  font-weight: bold;
}
</style>