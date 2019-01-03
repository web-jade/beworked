<template>
  <div class="HomePage">
    <LandingHeader />
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Beworked
          </h1>
          <h2 class="subtitle">
            Employee accounting service
          </h2>
          <button @click="$store.commit('setLoading')">
            restore
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    import LandingHeader from "@/components/core/Header";
    export default {
        name: "Home",
        components: {LandingHeader}
    }
</script>

<style lang="scss">
</style>
