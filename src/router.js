import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import LogIn from './components/LogIn.vue'
import Home from './components/Home.vue'
import RegistrarEmpleado from './components/RegistrarEmpleado.vue'
import EditarEmpleado from './components/EditarEmpleado.vue'
import EliminarEmpleado from './components/EliminarEmpleado.vue'
import ConsultarPersonal from './components/consultarPersonal.vue'
import RegistrarNuevoUsuario from './components/RegistrarNuevoUsuario.vue'
import CrearNomina from './components/CrearNomina.vue'
import EditarNomina from './components/EditarNomina.vue'
import EditarTipoNovedad from './components/EditarTipoNovedad.vue'
import CrearTipoNovedad from './components/CrearTipoNovedad.vue'
import CrearNovedad from './components/CrearNovedad.vue'
import EliminarNovedad from './components/EliminarNovedad.vue'
import ConsultarNovedades from './components/ConsultarNovedades.vue'
import ConsultarNomina from './components/ConsultarNomina.vue'




const routes = [{
  path: '/',
  name: 'root',
  component: App
},
{
  path: '/user/logIn',
  name: 'logIn',
  component: LogIn
},
{
  path: '/user/home',
  name: 'home',
  component: Home
},
{
  path: '/user/registrarNuevoUsuario',
  name: 'registrarNuevoUsuario',
  component: RegistrarNuevoUsuario
},
{
  path: '/user/registrarEmpleado',
  name: 'registrarEmpleado',
  component: RegistrarEmpleado
},
{
  path: '/user/editarEmpleado',
  name: 'editarEmpleado',
  component: EditarEmpleado
},
{
  path: '/user/eliminarEmpleado',
  name: 'eliminarEmpleado',
  component: EliminarEmpleado
},
{
  path: '/user/consultarPersonal',
  name: 'consultarPersonal',
  component: ConsultarPersonal
},
{
  path: '/crearNomina',
  name: 'crearNomina',
  component: CrearNomina
},
{
  path: '/consultarNomina/user/cod_nom/cod_emp',
  name: 'consultarNomina',
  component: ConsultarNomina
},
{
  path: '/editarNomina/user/cod_nom/cod_emp',
  name: 'editarNomina',
  component: EditarNomina
},
{
  path: '/consultarNovedades/user/cod_nom/cod_emp',
  name: 'consultarNovedades',
  component: ConsultarNovedades
},
{
  path: '/crearNovedad/user/cod_nom/cod_emp',
  name: 'crearNovedad',
  component: CrearNovedad
},
{
  path: '/eliminarNovedad/user/cod_nom/cod_emp',
  name: 'eliminarNovedad',
  component: EliminarNovedad
},
{
  path: '/crearTipoNovedad/',
  name: 'crearTipoNovedad',
  component: CrearTipoNovedad
},
{
  path: '/editarTipoNovedad/user/cod_nom',
  name: 'editarTipoNovedad',
  component: EditarTipoNovedad
},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router