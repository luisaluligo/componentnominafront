<template>
  <div>
    <div class="container">
      <div>
        <b-form-group label="Nombre tipo novedad:" label-for="input-name"    v-if="!show" >
          <select
            class="mb-3"
            v-model="tipnov_selected"
            @change="onChange($event)"
          >
            <option :value="null" disabled>
              seleccione el tipo de novedad
            </option>
            <option
              v-for="tipnov in listaTipNov"
              :key="tipnov.nombre_tipnov"
              :value="tipnov.codigo_tipnov"
            >
              {{ tipnov.nombre_tipnov }}
            </option>
          </select>
        </b-form-group>
      </div>
      <b-form @submit="processEditarTipoNovedad" @reset="onReset" v-if="show">
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
          <b-form-select id="select-concepto" v-model="form.tipo_novedad.tiponovedad_data.tipoconcepto_tipnov" :options="options">
          </b-form-select>
          
        </b-form-group>

        <v-select 
    :options="options" 
    label="title"
  ></v-select>

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
      tipnov_selected:null,
      form: {
        tipo_novedad: {
          user: 0,
          tiponovedad_data: {
            cod_tipnov: "",
            nombre_tipnov: "",
            valorbase_tipnov: "",
            tipoconcepto_tipnov: null,
          },
        },
      },
      options: [
       {value: null, text: 'Seleccionar'  },
       {value: 'ingreso', html: '<b>ingreso</b>' },
       {value: 'descuento', html: '<b>descuento</b>' }
      ],
      show: false,
      data_respuesta: [],
      listaTipNov: [],
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
        this.show = false;
      });
    },
    processEditarTipoNovedad: async function () {
        console.log(localStorage)
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let user_id = jwt_decode(token).user_id.toString();
      this.form.tipo_novedad.user = user_id;
     
      axios
        .put(
            `https://componentnominaback.herokuapp.com/editarTipoNovedad/${user_id}/${this.tipnov_selected}`,
          this.form.tipo_novedad.tiponovedad_data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          this.data_respuesta = result.data;
          if (this.show) {
            console.log("true");

            alert(JSON.stringify(result.data));
            this.form.tipo_novedad.tiponovedad_data.nombre_tipnov =
              result.data.nombre_tipnov;
            this.form.tipo_novedad.tiponovedad_data.valorbase_tipnov =
              result.data.valorbase_tipnov;
            this.form.tipo_novedad.tiponovedad_data.tipoconcepto_tipnov =
              result.data.tipoconcepto_tipnov;
              
          } else {
            console.log("truelo");
          }

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
    verifyToken:  function () {
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
    getDataTipNov: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      axios
        .get(
          `https://componentnominaback.herokuapp.com/consultarTipoNovedades/${userId}/`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          this.listaTipNov = result.data;
              console.log("true--" + listaTipNov);
          if (this.show) {
            console.log("true--");
            console.log(data_respuesta)
          } else {
            console.log("truelo");
          }
        })
        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Las credenciales son incorrectas o han expirado");
          else if (error.response.status == "400")
            alert(
              "ERROR 400: Verifique que haya ingresado la información correcta en todos los campos. No se permiten campos vacios"
            );
        });
    },
    onChange(event) {

       
     if (event.target.value) {
        for (let index = 0; index <= this.listaTipNov.length-1 ; index++) {
                if (this.listaTipNov[index]["codigo_tipnov"] == this.tipnov_selected) {
                   this.data_respuesta = this.listaTipNov[index];

                }
        }

        this.form.tipo_novedad.tiponovedad_data.nombre_tipnov =
             this.data_respuesta["nombre_tipnov"] ;
        this.form.tipo_novedad.tiponovedad_data.valorbase_tipnov =
               this.data_respuesta["valorbase_tipnov"];
        this.form.tipo_novedad.tiponovedad_data.tipoconcepto_tipnov =
               this.data_respuesta["tipoconcepto_tipnov"];
        this.show = true

      }
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },
  },
  created: async function () {
    this.getDataTipNov();
    this.processEditarTipoNovedad();
  },
};
</script>

