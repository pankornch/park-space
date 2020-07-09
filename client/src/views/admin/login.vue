<template>
  <!-- login form -->
  <main class="login-form mt-5" style="height: 87vh; width: 80%; margin: auto;">
    <div class="cotainer">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form @submit.prevent>
                <div class="form-group row">
                  <label for="email_address" class="col-md-4 col-form-label text-md-right">Username</label>
                  <div class="col-md-6">
                    <input
                      type="text"
                      id="username"
                      class="form-control"
                      v-model="form.username"
                      required
                      autofocus
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                  <div class="col-md-6">
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      v-model="form.password"
                      required
                      @keyup.enter="onlogin"
                    />
                  </div>
                </div>

                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary" @click="onlogin">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onlogin() {
      this.$store.dispatch("getlogin", {
        email: this.form.username,
        password: this.form.password
      });
    }
  }
};
</script>

<style>
</style>