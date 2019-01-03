<template>
  <div class="b-page-account-create">
    <Header />
    <form
      class="container box b-page-account-create__wrapper"
      @submit.prevent="onSubmit()"
    >
      <h1 class="heading b-page-account-create__heading">
        Create account
      </h1>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">
              Display name
            </label>
            <div class="control">
              <input
                v-model="form.displayName"
                class="input"
                type="text"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">
              First name
            </label>
            <div class="control">
              <input
                v-model="form.firstName"
                class="input"
                type="text"
              >
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">
              Last name
            </label>
            <div class="control">
              <input
                v-model="form.lastName"
                class="input"
                type="text"
              >
            </div>
          </div>
        </div>
      </div>
      <input
        class="button is-primary is-rounded"
        type="submit"
        :value="getLoading === true ? 'Loading...' : 'Create'"
        :disabled="getLoading"
      >
    </form>
  </div>
</template>

<script>
    import Header from '@/components/core/Header'

    export default {
        name: "AccountCreate",
        components: {
            Header
        },
        data () {
            return {
                form: {
                    displayName: '',
                    firstName: '',
                    lastName: ''
                }
            }
        },
        computed: {
            getLoading: function () {
                return this.$store.getters.getLoading
            }
        },
        created () {
            if (this.$store.getters.getUser.confirmRegistration === true) {
                this.$router.push('/account')
            }
        },
        methods: {
            onSubmit: function () {
                if (this.form.displayName.length > 0 && this.form.firstName.length > 0 && this.form.lastName.length > 0) {
                    const userAdditionalInformation = {
                        displayName: this.form.displayName,
                        firstName: this.form.firstName,
                        lastName: this.form.lastName
                    }
                    this.$store.dispatch('confirmUserRegistration', userAdditionalInformation)
                        .then(() => {
                            this.$router.push('/account')
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            }
        }
    }
</script>

<style lang="scss">
    .b-page-account-create__wrapper {
        margin-top: 40px;
        max-width: 540px;
    }

    .b-page-account-create__heading {
        margin-bottom: 15px;
    }
</style>
