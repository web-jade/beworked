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
        data () {
            return {}
        },
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
