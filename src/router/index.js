import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreateTask from '../views/CreateTask.vue';
import TaskList from '../views/TaskList.vue'
import Login from '../views/Login.vue'

const routes = [
  { 
    path: '/login', 
    name: 'Login', 
    component: Login },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/crear-tarea',
    name: 'CreateTask',
    component: CreateTask
  },
  {
    path: '/tareas',
    name: 'TaskList',
    component: TaskList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router;