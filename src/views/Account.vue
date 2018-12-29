<template>
  <div class="AccountPage">
    <LandingHeader />
  </div>
</template>

<script>
    import LandingHeader from "@/components/core/Header";
    export default {
        name: "Account",
        components: {LandingHeader},
        created () {
            if (!this.$store.getters.getAuth) {
                this.$router.push('/login')
            }
        },
        methods: {}
    }
</script>

<style lang="scss">

</style>
