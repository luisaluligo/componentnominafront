<template>
  <div>
    <div class="container">
      <div>
        <b-form-group label="Nombre tipo novedad:" label-for="input-name">
          <select
            class="mb-3"
            ref="seleccionado"
            v-model="tipnov_selected"
            @change="onChange(this.value)"
          >
            <option :value="null" disabled>
              seleccione el tipo de novedad
            </option>
            <option
              v-for="tipnov in listaTipNov"
              :key="tipnov.cod_tipnov"
              :value="tipnov.cod_tipnov"
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
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ listaTipNov }}</pre>
      </b-card>
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
      tipnov_selected: null,
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
        { text: "Seleccione uno", value: null },
        "ingreso",
        "descuento",
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
        this.show = true;
      });
    },
    processEditarTipoNovedad: async function () {
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
      console.log("id user decode" + user_id);
      this.form.tipo_novedad.user = user_id;

      axios
        .post(
          "https://componentnominaback.herokuapp.com/editarTipoNovedad/",
          this.form.tipo_novedad,
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
          
          if (this.show) {
            console.log("true--");
            this.form.tipo_novedad.tiponovedad_data.nombre_tipnov =
              result.data.nombre_tipnov;
            this.form.tipo_novedad.tiponovedad_data.valorbase_tipnov =
              result.data.valorbase_tipnov;
            this.form.tipo_novedad.tiponovedad_data.tipoconcepto_tipnov =
              result.data.tipoconcepto_tipnov;

              for (let index = 0; index <= result.data.length; index++) {
                 console.log(result.data[index])
                if (result.data[index].id === this.$refs.seleccionado.value) {
                  data_respuesta = result.data[index];
                   console.log("igual")
                }
              }
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
      console.log(this.tipnov_selected);
      console.log(this.$refs.seleccionado.value);

      if (this.$refs.seleccionado.value) {
        this.show = true;
        this.getDataTipNov();
      }
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },
  },
  created: async function () {
    this.getDataTipNov();
  },
};
</script>

