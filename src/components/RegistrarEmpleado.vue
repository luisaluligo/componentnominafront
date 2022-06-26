<template>
  <div>
    <h2 class="encabezado">Registro de personal</h2>
    <div class="contenedor_info">
      <form
        id="info_emp"
        name="info_emp"
        class="form_emp"
        v-on:submit.prevent="processRegistrarEmpleado"
      >
        <div class="infoEmpleado">
          <h3>Información del empleado</h3>
          <label for="codigo_emp">Identificación: </label>
          <input
            type="number"
            id="codigo_emp"
            name="codigo_emp"
            v-model="empleado.codigo_emp"
          /><br /><br />
          <label for="nombre_emp">Nombre completo: </label>
          <input
            type="text"
            id="nombre_emp"
            name="nombre_emp"
            v-model="empleado.nombre_emp"
          /><br /><br />
          <label for="tipo_emp">Tipo de persona: </label>
          <select
            id="tipo_emp"
            name="Tipo_persona"
            tipo_emp="tipo_emp"
            v-model="empleado.tipo_persona_emp"
          >
            <option value="Natural">Natural</option>
            <option value="Juridica">Jurídica</option></select
          ><br /><br />
          <label for="estado_emp">Estado: </label>
          <select
            id="estado_emp"
            name="estado_empleado"
            estado_emp="estado_emp"
            v-model="empleado.estado_emp"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div class="infoEmpleado">
          <h3>Información del contrato</h3>
          <label for="cargo_cont">Cargo ocupado: </label>
          <input
            type="text"
            id="cargo_cont"
            name="cargo_cont"
            v-model="empleado.contrato.cargo_cont"
          /><br /><br />
          <label for="salario_con">Salario: </label>
          <input
            type="number"
            id="salario_con"
            name="salario_con"
            v-model="empleado.contrato.salario_con"
          /><br /><br />
          <label for="fechainicio_con">Fecha de inicio: </label>
          <input
            type="date"
            id="fechainicio_con"
            name="fechainicio_con"
            v-model="empleado.contrato.fechainicio_con"
          /><br /><br />
          <label for="fechafin_con">Fecha de finalización: </label>
          <input
            type="date"
            id="fechafin_con"
            name="fechafin_con"
            v-model="empleado.contrato.fechafin_con"
          /><br /><br />
          <label for="tipo_con">Tipo de vinculación: </label>
          <select
            id="tipo_con"
            name="Tipo_persona"
            tipo_con="tipo_con"
            v-model="empleado.contrato.tipo_con"
          >
            <option value="Empleado">Empleado</option>
            <option value="Contratista">Contratista</option>
          </select>
        </div>
        <div class="botonesDeAccion">
          <button type="submit">Registrar empleado</button>
          <button v-on:click="loadHome">Cancelar y volver a inicio</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistrarEmpleado",

  data: function () {
    return {
      empleado: {
        codigo_emp: "",
        nombre_emp: "",
        tipo_persona_emp: "",
        estado_emp: "",
        contrato: {
          cargo_cont: "",
          salario_con: "",
          fechainicio_con: "",
          fechafin_con: "",
          tipo_con: "",
        },
      },
    };
  },

  methods: {
    processRegistrarEmpleado: function () {
      axios
        .post(
          "https://componentnominaback.herokuapp.com/registrarEmpleado/",
          this.empleado,
          {
            headers: {},
          }
        )
        .then((result) => {
          let dataRegistrarEmpleado = {
            codigo_emp: this.empleado.codigo_emp,
            nombre_emp: this.empleado.nombre_emp,
            tipo_persona_emp: this.empleado.tipo_persona_emp,
            estado_emp: this.empleado.estado_emp,
            cargo_cont: this.empleado.contrato.cargo_cont,
            salario_con: this.empleado.contrato.salario_con,
            fechainicio_con: this.empleado.contrato.fechainicio_con,
            fechafin_con: this.empleado.contrato.fechafin_con,
            tipo_con: this.empleado.contrato.tipo_con,
          };
          this.$emit("", dataRegistrarEmpleado);
          alert("El registro fue exitoso");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == "401")
            alert("ERROR 401: Las credenciales son incorrectas o han expirado");
          else if (error.response.status == "400")
            alert("ERROR 400: Verifique que haya ingresado la información correcta en todos los campos. No se permiten campos vacios")
        });
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
.encabezado {
  margin: 20px;
}
.contenedor_info {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  grid-auto-columns: 1fr;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto auto;
  grid-template-rows: auto auto;
}
.form_emp {
  display: -ms-grid;
  display: grid;
  width: 100%;
  margin-right: 20px;
  grid-auto-columns: 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto auto;
  grid-template-rows: auto auto;
}
.infoEmpleado {
  margin: 40px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.botonesDeAccion {
  margin: 40px;
  width: 100%;
  align-content: right;
  align-items: right;
  justify-content: right;
  justify-items: right;
}
.botonesDeAccion button {
  margin: 30px;
}
</style>