<template>
  <div>
    <h2 class="encabezado">Información del personal de la empresa</h2>
    <button v-on:click="cargarInfoPersonal">Consultar información</button>
    <div class="contenedor_info_tabla">
      <table class="table">
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Nombre</th>
            <th>Tipo de persona</th>
            <th>Estado</th>
            <th>Cargo ocupado</th>
            <th>Salario (COP)</th>
            <th>Fecha incial del contrato</th>
            <th>Fecha final del contrato</th>
            <th>Tipo de contrato</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in personal" :key="e">
            <td>{{ e.codigo_emp }}</td>
            <td>{{ e.nombre_emp }}</td>
            <td>{{ e.tipo_persona_emp }}</td>
            <td>{{ e.estado_emp }}</td>
            <td>{{ e.contrato.cargo_cont }}</td>
            <td>{{ e.contrato.salario_con }}</td>
            <td>{{ e.contrato.fechainicio_con }}</td>
            <td>{{ e.contrato.fechafin_con }}</td>
            <td>{{ e.contrato.tipo_con }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ConsultarPersonal",

  data: function () {
    return {
      personal: {},
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
    cargarInfoPersonal: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }

      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let este = this;

      axios
        .get("https://componentnominaback.herokuapp.com/infoPersonal/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          este.personal = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },

    verifyToken: function () {
      return axios
        .post(
          "https://componentnominaback.herokuapp.com/",
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
  },
};
</script>

<style>
.contenedor_info_tabla {
  overflow: scroll;
  height: 400px;
  width: 100%;
}
.contenedor_info_tabla table {
  overflow: auto;
  table-layout: fixed;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 100%;
  margin: 25px;
  border-collapse: collapse;
  border: 1px solid black;
}
.contenedor_info_tabla tbody tr:nth-child(odd){
  background-color: rgb(185, 185, 185);
}
.contenedor_info_tabla tbody td{
  border: 1px solid black;
}
.contenedor_info_tabla thead th{
  border: 1px solid black;
}
button {
  margin: 20px;
}
th,td{
  padding: 7px;
  text-align: center;
}
</style>