<template>
  <div class="RegisterPage">
    <LandingHeader />
    <div
      is="sui-container"
      class="RegisterPage__wrapper"
    >
      <SuiSegment>
        <SuiMessage
          v-if="error.visible"
          header="Error"
          :content="error.message"
          dismissable
          @dismiss="handleDismiss"
        />
        <h1 is="sui-header">
          Register
        </h1>
        <SuiForm @submit.prevent="onSubmit()">
          <SuiFormField>
            <label>E-mail</label>
            <input
              v-model="form.email"
              type="email"
            >
          </SuiFormField>
          <SuiFormField>
            <label>Password</label>
            <input
              v-model="form.password"
              type="password"
            >
          </SuiFormField>
          <SuiButton type="submit">
            Submit
          </SuiButton>
        </SuiForm>
      </SuiSegment>
    </div>
  </div>
</template>

<script>
    import LandingHeader from "@/components/core/Header";
    export default {
        name: "Register",
        components: {LandingHeader},
        data () {
            return {
                form: {
                    email: '',
                    password: ''
                },
                error: {
                    visible: false,
                    message: null
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
                    this.$store.dispatch('registerUser', user)
                        .then(() => {
                            this.$router.push('/account')
                        })
                        .catch(error => {
                            this.error.visible = true
                            this.error.message = error.message
                        })
                }
            },
            handleDismiss() {
                this.error.visible = false
            }
        }
    }
</script>

<style lang="scss">
    .RegisterPage__wrapper {
        margin-top: 40px;
    }
</style>
