<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
      >
        <div class="navbar-start">
          <RouterLink
            to="/"
            class="navbar-item"
          >
            Home
          </RouterLink>
          <RouterLink
            v-if="getAuth"
            to="/account"
            class="navbar-item"
          >
            Account
          </RouterLink>
          <RouterLink
            v-if="getAuth"
            to="/profile"
            class="navbar-item"
          >
            Profile
          </RouterLink>
        </div>

        <div class="navbar-end">
          <div
            v-if="!getAuth"
            class="navbar-item"
          >
            <div class="buttons">
              <RouterLink
                to="/login"
                class="button is-light is-rounded"
              >
                Sign in
              </RouterLink>
              <RouterLink
                to="/register"
                class="button is-primary is-rounded"
              >
                Sign up
              </RouterLink>
            </div>
          </div>
          <div
            v-if="getAuth"
            class="navbar-item"
          >
            <div class="buttons">
              <a
                class="button is-primary is-rounded"
                @click="onLogout()"
              >
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
        name: "LandingHeader",
        computed: {
            getAuth: function () {
                return this.$store.getters.getAuth
            }
        },
        methods: {
            onLogout: function () {
                this.$store.commit('logoutUser')
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="scss">

</style>
