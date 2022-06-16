<template>
  <div id="home" class="home">
    <div class="bienvenida">
      <h2 id="saludo">
        ¡Bienvenido <span> {{ username }} </span>! <br />
        <br />
        Seleccione la opción que desee ejecutar.
      </h2>
    </div>

    <div v-if="is_superuser" class="botonRegistrarUsuario">
      <h4>Usuarios del sistema</h4>
      <nav>
        <b-button v-on:click="loadRegistrarUsuario">
          Registrar nuevo usuario
        </b-button>
      </nav>
    </div>
    <div class="container-fluid" id="main-content">
    <div class="row text-white text-center">
        
  <div class="col-4 bg-dark border">
   <img src="../assets/empleadosp.png" class="img-thumbnail" width ="304" height="236">
      <b-button-toolbar>
        <b-dropdown class="mx-1" variant="dark" text="Gestion Empleado">
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadRegistrarEmpleado">
              Registrar personal
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadEditarEmpleado">
              Editar información de personal
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadEliminarEmpleado">
              Eliminar personal
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadConsultarPersonal">
              Consultar información del personal
            </b-button></b-dropdown-item
          >
        </b-dropdown>
      </b-button-toolbar>
    </div>
   
    <div  class="col-4 bg-dark border">
      <img src="../assets/nomina.png" class="img-thumbnail" width ="304" height="236">
      <b-button-toolbar>
        <b-dropdown id="paquete" class="mx-1" variant="dark" right text="Gestion Nomina">
          <b-dropdown-item>
            <b-button variant="info"   v-on:click="loadCrearNomina">
              Registrar Nomina
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadEditarNomina">
              Editar Nomina
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadConsultarNomina">
              Consultar Nomina
            </b-button></b-dropdown-item
          >
        </b-dropdown>
      </b-button-toolbar>
    </div>

    <div  class="col-4 bg-dark border" >
      <img src="../assets/logoNovedad.png" class="img-thumbnail" width ="304" height="236">
      <b-button-toolbar>
        <b-dropdown  class="mx-1" variant="dark" right text="Gestion Novedades">
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadCrearTiponovedad">
              Registrar Tipo Novedad
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadEditarTipoNovedad">
              Editar Tipo Novedad
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadCrearNovedad">
              Registrar Novedad
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadEliminarNovedad">
              Eliminar Novedad
            </b-button></b-dropdown-item
          >
          <b-dropdown-item>
            <b-button variant="info" v-on:click="loadConsultarNovedades">
              Consultar Novedades
            </b-button></b-dropdown-item
          >
        </b-dropdown>
      </b-button-toolbar>
    </div>
  </div>
  </div>
   </div>
</template>

<script>
export default {
  name: "Home",

  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
      is_superuser: localStorage.getItem("is_superuser"),
    };
  },

  methods: {
    loadRegistrarEmpleado: function () {
      this.$router.push({ name: "registrarEmpleado" });
    },

    loadEditarEmpleado: function () {
      this.$router.push({ name: "editarEmpleado" });
    },

    loadEliminarEmpleado: function () {
      this.$router.push({ name: "eliminarEmpleado" });
    },

    loadConsultarPersonal: function () {
      this.$router.push({ name: "consultarPersonal" });
    },

    loadRegistrarUsuario: function () {
      this.$router.push({ name: "registrarNuevoUsuario" });
    },
    loadConsultarNomina: function () {
      this.$router.push({ name: "consultarNomina" });
    },

    loadConsultarNovedades: function () {
      this.$router.push({ name: "consultarNovedades" });
    },

    loadCrearNomina: function () {
      this.$router.push({ name: "cearNomina" });
    },

    loadCrearTiponovedad: function () {
      this.$router.push({ name: "crearTipoNovedad" });
    },

    loadEditarNomina: function () {
      this.$router.push({ name: "editarNomina" });
    },
    loadEditarTipoNovedad: function () {
      this.$router.push({ name: "editarTipoNovedad" });
    },
    loadCrearNovedad: function () {
      this.$router.push({ name: "crearNovedad" });
    },
    loadEliminarNovedad: function () {
      this.$router.push({ name: "eliminarNovedad" });
    },
  },
};
</script>

<style>
.bienvenida {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.bienvenida h2 {
  font-size: 30px;
  color: black;
  text-align: center;
  margin-top: 5%;
}


</style>