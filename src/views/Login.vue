<!-- filepath: /home/roberto/Descargas/Curso GitHub Copilot 3IT/project-tareas/frontend-tareas/src/views/Login.vue -->
<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2>Acceso al Sistema</h2>
      <div>
        <label for="correo">Correo electrónico:</label>
        <input id="correo" v-model="correo" type="email" required />
      </div>
      <div>
        <label for="clave">Clave:</label>
        <input id="clave" v-model="clave" type="password" required />
      </div>
      <button type="submit">Ingresar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
//import axios from 'axios'
import api from '../services/api'
import { useRouter } from 'vue-router'

const correo = ref('')
const clave = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  error.value = ''
  try {
    const res = await api.post('http://localhost:3000/api/usuarios/login', {
      correo: correo.value,
      clave: clave.value
    })
    // Guarda el token en localStorage o variable global
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al iniciar sesión'
  }
}
</script>

<script>
export default {
  name: 'LoginView'
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e3e3e3;
}
.login-form {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  min-width: 320px;
}
.login-form h2 {
  margin-bottom: 1.5rem;
  color: #42b983;
  text-align: center;
}
.login-form label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
.login-form input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.2rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.login-form button {
  width: 100%;
  background: #42b983;
  color: #fff;
  border: none;
  padding: 0.7rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}
.error {
  color: #d32f2f;
  margin-top: 1rem;
  text-align: center;
}
</style>