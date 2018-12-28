<template>
  <div class="auth">
    <p v-if="errorMessage">
      Error: {{ errorMessage }}
    </p>
    <form @submit.prevent="onLogin()">
      <input
        v-model="form.email"
        type="text"
        placeholder="Почта"
      >
      <input
        v-model="form.password"
        type="text"
        placeholder="Пароль"
      >
      <input
        type="submit"
        value="Войти"
      >
    </form>
    <form @submit.prevent="onRegister()">
      <input
        v-model="form.email"
        type="text"
        placeholder="Почта"
      >
      <input
        v-model="form.password"
        type="text"
        placeholder="Пароль"
      >
      <input
        type="submit"
        value="Регистрация"
      >
    </form>
  </div>
</template>

<script>
    export default {
        name: "Auth",
        data () {
            return {
                errorMessage: null,
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        created () {
            if (this.$store.getters.getAuth) {
                this.$router.push('/account')
            }
        },
        methods: {
            onLogin: function () {
                if (this.form.email.length > 0 && this.form.password.length > 0) {
                    const user = {
                        email: this.form.email,
                        password: this.form.password
                    }
                  this.$store.dispatch('loadingUser', user)
                      .then(() => {
                          this.$router.push('/account')
                      })
                      .catch(error => {
                          this.errorMessage = error.message
                      })
                }
            },
            onRegister: function () {
                if (this.form.email.length > 0 && this.form.password.length > 0) {
                    const user = {
                        email: this.form.email,
                        password: this.form.password
                    }
                    this.$store.dispatch('registerUser', user)
                        .then(() => {
                            this.$router.push('/account')
                        })
                        .catch(error => {
                            this.errorMessage = error.message
                        })
                }
            }
        }
    }
</script>

<style lang="scss">
  .auth__login {
    border: 1px solid gray;
  }
</style>
