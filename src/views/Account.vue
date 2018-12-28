<template>
  <div class="account">
    <div>
      <button
        type="submit"
        @click="onLogout()"
      >
        logout
      </button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Account",
        created () {
            if (!this.$store.getters.getAuth) {
                this.$router.push('/auth')
            }
        },
        methods: {
            onLogout: function () {
                this.$store.commit('logoutUser')
                this.$router.push('/auth')
            }
        }
    }
</script>

<style lang="scss">

</style>
