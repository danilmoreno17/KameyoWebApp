<template>
  <div class="vertical-align-wrap">
    <div class="vertical-align-middle auth-main">
      <div class="auth-box">
        <div class="top">
          <!-- <img src="../../../assets/logo-white.svg" alt="Lucid" /> -->
          <img src="../../../assets/logo.svg" alt="Kameyo" />
        </div>
        <div class="card">
          <div class="header">
            <p class="lead">Ingrese a su cuenta</p>
          </div>
          <div class="body">
            <!-- <form class="form-auth-small" v-on:submit.prevent="submit"> -->
            <form class="form-auth-small" onsubmit="return false;">
              <div class="form-group">
                <label for="signin-email" class="control-label sr-only"
                  >Email</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="signin-email"
                  v-model="email"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <label for="signin-password" class="control-label sr-only"
                  >Contraseña</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="signin-password"
                  v-model="password"
                  placeholder="Password"
                />
              </div>
              <div class="form-group clearfix">
                <label class="fancy-checkbox element-left">
                  <input type="checkbox" />
                  <span>Recuérdame</span>
                </label>
              </div>
              <!-- <button type="submit" class="btn btn-primary btn-lg btn-block"> -->
              <button @click="signIn" class="btn btn-primary btn-lg btn-block">
                Iniciar sesión
              </button>
              <div class="bottom">
                <span class="helper-text m-b-10"
                  ><i class="fa fa-lock"></i>
                  <router-link to="/authentication/page-forgot-password"
                    >¿Se te olvidó tu contraseña?</router-link
                  ></span
                >
                <!-- <span
                  >Don't have an account?
                  <router-link to="/authentication/page-register"
                    >Register</router-link
                  ></span
                > -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END WRAPPER -->
</template>
<script>
import { authUserStore } from "../../../stores/auth";

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signIn() {
      const authUser = authUserStore();

      if (!this.email) {
        return;
      }

      if (!this.password) {
        return;
      }

      const authResponse = await authUser.signIn({
        email: this.email,
        password: this.password,
      });

      if (authResponse.accessToken) {
        authUser.$patch({
          authenticated: true,
          user: authResponse.user,
        });

        localStorage.setItem("user", JSON.stringify(authResponse.user));
        localStorage.setItem("authenticated", JSON.stringify(true));

        this.$router.push({ path: "/dashboard/index" });
      }
    },

    // submit(e) {
    //   this.$router.push({ path: "/dashboard/index" });
    //   e.preventDefault();
    //   //...
    // },
  },
};
</script>
<style scoped></style>
