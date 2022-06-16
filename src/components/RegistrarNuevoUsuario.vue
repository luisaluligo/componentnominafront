<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Registrar nuevo usuario</h2>
      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Usuario" />
        <br />
        <input
          type="password"
          v-model="user.password"
          placeholder="Contraseña"
        />
        <br />
        <input type="text" v-model="user.name" placeholder="Nombre" />
        <br />
        <input type="email" v-model="user.email" placeholder="Email" />
        <br />
        <button type="submit">Registrar usuario</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegistrarNuevoUsuario",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: "",
      },
    };
  },
  methods: {
    processSignUp: function () {
      axios
        .post("https://componentnominaback.herokuapp.com/user/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataSignUp = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedSignUp", dataSignUp);
          alert("Registro exitoso")
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>

<style>
.signUp_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_signUp_user {
  border: 3px solid #303336;
  border-radius: 10px;
  width: 25%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signUp_user h2 {
  color: #303336;
}
.signUp_user form {
  width: 70%;
}
.signUp_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #303336;
}
.signUp_user button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #303336;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.signUp_user button:hover {
  color: #303336;
  background: #e5e7e9;
  border: 1px solid #303336;
}
</style>