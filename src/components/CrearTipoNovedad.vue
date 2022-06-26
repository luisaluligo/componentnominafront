<template>
  <div>
    <div class="container">
      <b-form @submit="processCrearTipoNovedad" @reset="onReset" v-if="show">
        <b-form-group label="Nombre tipo novedad:" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="form.tipo_novedad.tiponovedad_data.nombre_tipnov"
            placeholder="Ingerese el nombre"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Concepto tipo novedad:"
          label-for="select-concepto"
        >
          <b-form-select
            id="select-concepto"
            v-model="form.tipo_novedad.tiponovedad_data.tipoconcepto_tipnov"
            :options="options"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Valor tipo novedad:" label-for="input-number">
          <b-form-input
            type="number"
            id="input-number"
            v-model="form.tipo_novedad.tiponovedad_data.valorbase_tipnov"
            placeholder="ingrese el valor"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
   
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "EditarTipoNovedad",
  data() {
    return {
      form: {
        tipo_novedad: {
          user: 0,
          tiponovedad_data: {
            nombre_tipnov: "",
            valorbase_tipnov: "",
            tipoconcepto_tipnov: null,
          },
        },
      },
      options: [
        { text: "Seleccione uno", value: null },
        "ingreso",
        "descuento",
      ],
      show: true,
      data_respuesta: [],
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.tipo_novedad.tiponovedad_data.nombre_tipnov = "";
      this.form.tipo_novedad.tiponovedad_data.valorbase_tipnov = "";
      this.form.tipo_novedad.tiponovedad_data.tipoconcepto_tipnov = null;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    processCrearTipoNovedad: async function () {
        console.log(localStorage)
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh")=== null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let user_id = jwt_decode(token).user_id.toString();
     
      this.form.tipo_novedad.user = user_id;
      
      axios
        .post(
          "https://componentnominaback.herokuapp.com/crearTipoNovedad/",
         this.form.tipo_novedad,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          this.data_respuesta = result.data;
           console.log('lo logramos')
          alert("El registro fue exitoso");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == "401")
            alert("ERROR 401: Las credenciales son incorrectas o han expirado");
          else if (error.response.status == "400")
            alert(
              "ERROR 400: Verifique que haya ingresado la información correcta en todos los campos. No se permiten campos vacios"
            );
        });
    },
    verifyToken: async function () {
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
};
</script>

<style>
</style>

<style>
</style>