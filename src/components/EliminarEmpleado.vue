<template>
  <div>
    <h2 class="encabezado">Eliminar registro de personal</h2>
    <div class="contenedor_info">
      <div class="infoEmpleado">
        <h4>
          Ingrese el numero de identificación de la persona que desee eliminar y
          oprima buscar para obtener la información
        </h4>
        <label for="codigo_emp">Identificación: </label>
        <input
          type="number"
          id="codigo_emp"
          name="codigo_emp"
          v-model="empleado.codigo_emp"
        /><br /><br />
        <button v-on:click="cargarInfoEmpleado">Buscar información</button>
        <h3>Información del empleado</h3>
        <form id="info_emp" name="info_emp" class="form_emp">
          <label for="nombre_emp">Nombre completo: </label>
          <input
            type="text"
            id="nombre_emp"
            name="nombre_emp"
            v-model="empleado.nombre_emp"
            disabled="disabled"
          />
          <label for="tipo_emp">Tipo de persona: </label>
          <select
            id="tipo_emp"
            name="Tipo_persona"
            tipo_emp="tipo_emp"
            v-model="empleado.tipo_persona_emp"
            disabled="disabled"
          >
            <option value="Natural">Natural</option>
            <option value="Juridica">Jurídica</option>
          </select>
          <label for="estado_emp">Estado: </label>
          <select
            id="estado_emp"
            name="estado_empleado"
            estado_emp="estado_emp"
            v-model="empleado.estado_emp"
            disabled="disabled"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </form>
      </div>
      <div class="infoEmpleado">
        <h3>Información del contrato</h3>
        <form id="info_emp" name="info_emp" class="form_emp">
          <label for="cargo_cont">Cargo ocupado: </label>
          <input
            type="text"
            id="cargo_cont"
            name="cargo_cont"
            v-model="empleado.contrato.cargo_cont"
            disabled="disabled"
          />
          <label for="salario_con">Salario: </label>
          <input
            type="number"
            id="salario_con"
            name="salario_con"
            v-model="empleado.contrato.salario_con"
            disabled="disabled"
          />
          <label for="fechainicio_con">Fecha de inicio: </label>
          <input
            type="date"
            id="fechainicio_con"
            name="fechainicio_con"
            v-model="empleado.contrato.fechainicio_con"
            disabled="disabled"
          />
          <label for="fechafin_con">Fecha de finalización: </label>
          <input
            type="date"
            id="fechafin_con"
            name="fechafin_con"
            v-model="empleado.contrato.fechafin_con"
            disabled="disabled"
          />
          <label for="tipo_con">Tipo de vinculación: </label>
          <select
            id="tipo_con"
            name="Tipo_persona"
            tipo_con="tipo_con"
            v-model="empleado.contrato.tipo_con"
            disabled="disabled"
          >
            <option value="Empleado">Empleado</option>
            <option value="Contratista">Contratista</option>
          </select>
        </form>
      </div>
    </div>
    <div class="botonesDeAccion">
      <button v-on:click="eliminarInfoEmpleado">
        Eliminar registro de empleado
      </button>
      <button v-on:click="loadHome">Cancelar y volver a inicio</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EliminarEmpleado",

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
    cargarInfoEmpleado: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }

      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let codigoEmp = document.getElementById("codigo_emp").value;

      axios
        .get(
          `https://componentnominaback.herokuapp.com/obtenerInfoEmpleado/${codigoEmp}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          this.empleado.codigo_emp = result.data.codigo_emp;
          this.empleado.nombre_emp = result.data.nombre_emp;
          this.empleado.tipo_persona_emp = result.data.tipo_persona_emp;
          this.empleado.estado_emp = result.data.estado_emp;
          this.empleado.contrato.cargo_cont = result.data.contrato.cargo_cont;
          this.empleado.contrato.salario_con = result.data.contrato.salario_con;
          this.empleado.contrato.fechainicio_con =
            result.data.contrato.fechainicio_con;
          this.empleado.contrato.fechafin_con =
            result.data.contrato.fechafin_con;
          this.empleado.contrato.tipo_con = result.data.contrato.tipo_con;
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status == "401")
            alert("Las credenciales son incorrectas o han expirado");
          else if (error.response.status == "404")
            alert("El usuario no existe en el sistema");
        });
    },

    eliminarInfoEmpleado: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }

      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let codigoEmp = document.getElementById("codigo_emp").value;

      axios
        .delete(
          `https://componentnominaback.herokuapp.com/eliminarEmpleado/${codigoEmp}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          alert("El registro fue eliminado exitosamente");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },

    verifyToken: function () {
      return axios
        .post(
          "https://componentnominaback.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )

        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })

        .catch(() => {
          this.$emit("logOut");
        });
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },
  },
  created: async function () {
    this.cargarInfoEmpleado;
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