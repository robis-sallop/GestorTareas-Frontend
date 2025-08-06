<template>
  <div class="task-list">
    <h2>Listado de Tareas</h2>
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Detalle</th>
          <th>Fecha de Creación</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarea in tareas" :key="tarea._id">
          <td>{{ tarea.titulo }}</td>
          <td>{{ tarea.detalle.slice(0, 30) }}...</td>
          <td>{{ formatFecha(tarea.fechaCreacion) }}</td>
          <td>{{ tarea.estado }}</td>
          <td>
            <button @click="verDetalle(tarea)">🔍</button>
            <button @click="editarTarea(tarea)">✏️</button>
            <button @click="confirmarEliminar(tarea)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Detalle -->
    <div v-if="modalDetalle" class="modal">
      <div class="modal-content">
        <h3>Detalle de la Tarea</h3>
        <p><strong>Título:</strong> {{ tareaSeleccionada.titulo }}</p>
        <p><strong>Detalle:</strong> {{ tareaSeleccionada.detalle }}</p>
        <p><strong>Fecha de Creación:</strong> {{ formatFecha(tareaSeleccionada.fechaCreacion) }}</p>
        <p><strong>Estado:</strong> {{ tareaSeleccionada.estado }}</p>
        <button @click="modalDetalle = false">Cerrar</button>
      </div>
    </div>

    <!-- Modal Edición -->
    <div v-if="modalEditar" class="modal">
      <div class="modal-content">
        <h3>Editar Tarea</h3>
        <form @submit.prevent="guardarEdicion">
          <div>
            <label>Título:</label>
            <input v-model="tareaSeleccionada.titulo" required />
          </div>
          <div>
            <label>Detalle:</label>
            <textarea v-model="tareaSeleccionada.detalle" required></textarea>
          </div>
          <div>
            <label>Estado:</label>
            <select v-model="tareaSeleccionada.estado" required>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <button type="submit">Guardar</button>
          <button type="button" @click="modalEditar = false">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Modal Confirmación Eliminar -->
    <div v-if="modalEliminar" class="modal">
      <div class="modal-content">
        <h3>¿Eliminar tarea?</h3>
        <p>¿Estás seguro que deseas eliminar la tarea <strong>{{ tareaSeleccionada.titulo }}</strong>?</p>
        <button @click="eliminarTarea">Sí, eliminar</button>
        <button @click="modalEliminar = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
//import axios from 'axios'

import api from '../services/api'

const tareas = ref([])
const modalDetalle = ref(false)
const modalEditar = ref(false)
const modalEliminar = ref(false)
const tareaSeleccionada = ref({})

const obtenerTareas = async () => {
  const res = await api.get('http://localhost:3000/api/tareas')
  tareas.value = res.data
}

const formatFecha = fecha => {
  return new Date(fecha).toLocaleString()
}

const verDetalle = tarea => {
  tareaSeleccionada.value = { ...tarea }
  modalDetalle.value = true
}

const editarTarea = tarea => {
  tareaSeleccionada.value = { ...tarea }
  modalEditar.value = true
}

const guardarEdicion = async () => {
  await api.put(`http://localhost:3000/api/tareas/${tareaSeleccionada.value._id}`, tareaSeleccionada.value)
  modalEditar.value = false
  obtenerTareas()
}

const confirmarEliminar = tarea => {
  tareaSeleccionada.value = { ...tarea }
  modalEliminar.value = true
}

const eliminarTarea = async () => {
  await api.delete(`http://localhost:3000/api/tareas/${tareaSeleccionada.value._id}`)
  modalEliminar.value = false
  obtenerTareas()
}

onMounted(obtenerTareas)
</script>

<style scoped>
.task-list {
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}
th, td {
  padding: 0.7rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
th {
  background: #f4f4f4;
}
button {
  margin-right: 0.3rem;
  font-size: 1.1rem;
  cursor: pointer;
  background: none;
  border: none;
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>