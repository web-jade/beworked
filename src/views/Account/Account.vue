<template>
  <div class="b-account-page">
    <LandingHeader />
  </div>
</template>

<script>
    import LandingHeader from "@/components/core/Header";

    export default {
        name: "Account",
        components: {LandingHeader},
        created () {
            if (!this.$store.getters.isUserConfirmAccount) {
                this.$router.push('/account/create')
            }
        }
    }
</script>

<style lang="scss">
</style>
