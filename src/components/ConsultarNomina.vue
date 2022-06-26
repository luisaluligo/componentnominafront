<template>
<div>
    
  
  
      
    <b-button-toolbar >
    <b-dropdown class="mx-1" right text="Gestion Empleado">
       <b-dropdown-item> <button v-on:click="loadRegistrarEmpleado">Registrar personal</button></b-dropdown-item>
      <b-dropdown-item>  <button v-on:click="loadEditarEmpleado">
          Editar información de personal
        </button></b-dropdown-item>
      <b-dropdown-item>  <button v-on:click="loadEliminarEmpleado">Eliminar personal</button></b-dropdown-item>
     <b-dropdown-item>   <button v-on:click="loadConsultarPersonal">
          Consultar información del personal
        </button></b-dropdown-item>
     
    </b-dropdown>
    <b-dropdown class="mx-1" right text="Gestion Nomina">
      <b-dropdown-item>Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-item>Item 3</b-dropdown-item>
    </b-dropdown>
    
  </b-button-toolbar>
</div>
     
</template>

<script>
export default {

}
</script>

<style>

</style>