<template>
  <div class="b-register-page">
    <LandingHeader />
    <form
      v-show="!isCodeSent"
      class="container box b-register-page__section"
      @submit.prevent="onSubmit()"
    >
      <h1 class="title has-text-centered">
        Registration
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
        class="button is-primary is-rounded"
        type="submit"
        :value="getLoading === true ? 'Loading...' : 'Register'"
        :disabled="getLoading"
      >
    </form>
    <!-- hidden -->
    <div
      v-show="isCodeSent"
      class="container box b-register-page__confirm"
    >
      <h1 class="title has-text-centered">
        Confirm you mail
      </h1>
      <p class="has-text-centered">
        A secret code was sent to the specified mail. Please confirm your mail
      </p>
    </div>
  </div>
</template>

<script>
    import { Snackbar } from 'buefy/dist/components/snackbar'
    import LandingHeader from "@/components/core/Header"
    import BField from "buefy/src/components/field/Field"
    import BInput from "buefy/src/components/input/Input"

    export default {
        name: "Register",
        components: {BInput, BField, LandingHeader},
        data () {
            return {
                isCodeSent: false,
                form: {
                    email: 'ergerger3e@cliptik.net',
                    password: '159753123QwE'
                }
            }
        },
        computed: {
            getLoading: function () {
                return this.$store.getters.getLoading
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
                    this.$store.dispatch('registerUser', user)
                        .then(() => {
                          this.isCodeSent = true
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
  .b-register-page__section {
    max-width: 450px;
    margin: 40px auto 0 auto;
  }

  .b-register-page__confirm {
    max-width: 500px;
    margin: 40px auto 0 auto;
  }

  .b-register-page__resend {
    display: table;
    margin: 15px auto 0 auto;
  }
</style>
