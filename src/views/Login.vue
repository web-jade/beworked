<template>
  <div class="b-login-page">
    <LandingHeader />
    <form
      class="container b-login-page__section"
      @submit.prevent="onSubmit()"
    >
      <h1 class="title has-text-centered">
        Login
      </h1>

      <BField label="Email">
        <BInput
          v-model="form.email"
          type="email"
        />
      </BField>

      <BField label="Password">
        <BInput
          v-model="form.password"
          type="password"
        />
      </BField>

      <input
        class="button"
        type="submit"
        value="Login"
      >
    </form>
  </div>
</template>

<script>
    import { Snackbar } from 'buefy/dist/components/snackbar'
    import LandingHeader from "@/components/core/Header"
    import BField from "buefy/src/components/field/Field"
    import BInput from "buefy/src/components/input/Input"

    export default {
        name: "Login",
        components: {BInput, BField, LandingHeader},
        data () {
            return {
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
            onSubmit: function () {
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
                            Snackbar.open({
                                message: error.message,
                                position: 'is-top',
                                actionText: 'Close',
                                duration: 5000
                            })
                        })
                }
            }
        }
    }
</script>

<style lang="scss">

  .b-login-page__section {
    max-width: 450px;
    margin: 40px auto 0 auto;

    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
  }
</style>
