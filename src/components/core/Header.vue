<template>
  <div class="LandingHeader">
    <div
      is="sui-container"
      class="LandingHeader__container"
    >
      <div class="LandingHeader__grid">
        <RouterLink
          to="/"
          class="LandingHeader__logo"
        >
          Beworked
        </RouterLink>
        <SuiMenu
          secondary
          class="LandingHeader__menu"
        >
          <RouterLink to="/">
            <SuiMenuItem
              link
              name="Home"
            >
              Home
            </SuiMenuItem>
          </RouterLink>
          <RouterLink
            v-if="!getAuth"
            to="/login"
          >
            <SuiMenuItem
              link
              name="Login"
            >
              Login
            </SuiMenuItem>
          </RouterLink>
          <RouterLink
            v-if="!getAuth"
            to="/register"
          >
            <SuiMenuItem
              link
              name="Register"
            >
              Register
            </SuiMenuItem>
          </RouterLink>
          <RouterLink
            v-if="getAuth"
            to="/account"
          >
            <SuiMenuItem
              link
              name="Account"
            >
              Account
            </SuiMenuItem>
          </RouterLink>
          <RouterLink to="/">
            <SuiMenuItem
              v-if="getAuth"
              link
              name="Logout"
              @click="onLogout()"
            >
              Logout
            </SuiMenuItem>
          </RouterLink>
        </SuiMenu>
      </div>
    </div>
  </div>
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
    .LandingHeader {
        width: 100%;
        height: 60px;

        background-color: #fff;
    }

    .LandingHeader__container {
        height: 100%;
    }

    .LandingHeader__grid {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .LandingHeader__logo {
        color: #000;
        font-size: 24px;
        font-weight: bold;
    }

    .LandingHeader__menu.ui.secondary.menu {
        margin: 0 0 0 auto;
    }
</style>
