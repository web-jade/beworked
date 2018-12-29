<template>
  <div class="b-page-profile">
    <Header />

    <div class="box container b-page-profile__wrapper">
      <h1 class="heading b-page-profile__heading">
        Profile
      </h1>
      <form>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">
                First name
              </label>
              <div class="control">
                <input
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
                  class="input"
                  type="text"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">
            Username
          </label>
          <div class="control">
            <input
              class="input"
              type="text"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">
            Email
          </label>
          <div class="control">
            <input
              v-model="user.email"
              class="input"
              type="email"
              autocomplete="email"
            >
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">
                Current password
              </label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  autocomplete="current-password"
                >
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">
                New password
              </label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  autocomplete="new-password"
                >
              </div>
            </div>
          </div>
        </div>
        <input
          class="button is-link is-fullwidth"
          type="submit"
          value="Update"
        >
      </form>
    </div>
  </div>
</template>

<script>
    import Header from '@/components/core/Header'

    export default {
        name: "Profile",
        components: {
            Header
        },
        data () {
            return {
                user: {}
            }
        },
        computed: {
            getUser: function () {
                return this.$store.getters.getUser
            }
        },
        created () {
            this.loadUserData()
        },
        methods: {
            loadUserData: function () {
                this.user = this.getUser
            }
        }
    }
</script>

<style lang="scss">
    .b-page-profile__wrapper {
        margin-top: 40px;
        max-width: 540px;
    }

    .b-page-profile__heading {
        margin-bottom: 30px;
    }
</style>
