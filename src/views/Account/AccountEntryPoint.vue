<template>
  <RouterView />
</template>

<script>
    export default {
        name: "AccountEntryPoint",
        created () {
            // if (!this.$store.getters.getAuth) {
            //     this.$router.push('/login')
            // }
            // if (!this.$store.getters.isUserConfirmAccount) {
            //     this.$router.push('/account/create')
            // }
        }
    }
</script>
