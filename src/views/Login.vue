<template>
  <div class="b-login-page">
    <LandingHeader />
    <form
      v-if="!emailVerification"
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
          autocomplete="email"
        />
      </BField>

      <BField label="Password">
        <BInput
          v-model="form.password"
          type="password"
          autocomplete="current-password"
        />
      </BField>

      <input
        class="button is-primary is-rounded"
        type="submit"
        :value="getLoading === true ? 'Loading...' : 'Login'"
        :disabled="getLoading"
      >
    </form>
    <!-- hidden -->
    <div
      v-if="emailVerification"
      class="container box b-register-page__confirm"
    >
      <h1 class="title has-text-centered">
        Confirm you mail
      </h1>
      <p class="has-text-centered">
        A secret code was sent to the specified mail. Please confirm your mail
      </p>
      <button
        type="button"
        class="button is-center b-register-page__confirm-resend"
        @click="onClickResendConfirm()"
      >
        {{ getResendDelayLabel }}
      </button>
    </div>
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
                emailVerification: false,
                resendDelay: 0,
                form: {
                    email: 'ergerger3e@cliptik.net',
                    password: '159753123QwE'
                }
            }
        },
        computed: {
            getLoading: function () {
                return this.$store.getters.getLoading
            },
            getResendDelayLabel: function () {
                if (this.resendDelay === 0) {
                    return 'Resend email confirm'
                }
                else {
                    return `Resend email confirm (${this.resendDelay} сек.)`
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
                            if (this.$store.getters.getUser.emailVerified) {
                                if (this.$store.getters.getUser.confirmRegistration === false) {
                                    this.$router.push('/account/create')
                                }
                                else {
                                    this.$router.push('/account')
                                }
                            }
                            else {
                                this.emailVerification = true
                                this.$store.commit('logoutUser')
                            }
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
            },
            onClickResendConfirm: function () {
                if (this.resendDelay === 0) {
                    console.log(this.$store.getters.getUser)
                    this.$store.dispatch('resendEmailConfirm')
                        .then(() => {
                            Snackbar.open({
                                message: 'Check you email',
                                position: 'is-top',
                                actionText: 'Close',
                                duration: 5000
                            })
                        })
                        .catch(error => {
                            Snackbar.open({
                                message: error.message,
                                position: 'is-top',
                                actionText: 'Close',
                                duration: 5000
                            })
                        })
                    this.resendDelay = 60
                    let interval = setInterval(() => {
                        this.resendDelay--
                    }, 1000)
                    setTimeout(() => {
                        clearInterval(interval)
                        this.resendDelay = 0
                    }, 60000)
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
    .b-register-page__confirm-resend {
        display: table;
        margin: 15px auto 0 auto;
    }
</style>
