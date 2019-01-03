<template>
  <div class="b-account-page">
    <Header />

    <div class="box container b-account-page__content">
      <h1 class="heading b-account-page__heading">
        My projects:
        <RouterLink
          to="/project/create"
          class="tag is-lowercase is-success"
        >
          Create project
        </RouterLink>
      </h1>
      <RouterLink
        v-for="item in getProjects"
        :key="item.name"
        to="/"
        class="box b-project"
      >
        <span class="b-project__heading">
          {{ item.name }}
        </span>
        <span class="b-project__budget">
          Budget: {{ item.budget }}
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script>
    import Header from "@/components/core/Header";
    import { Snackbar } from 'buefy/dist/components/snackbar'

    export default {
        name: "Account",
        components: {
            Header
        },
        computed: {
            getProjects: function () {
                return this.$store.getters.getProjects
            }
        },
        created () {
            if (!this.$store.getters.isUserConfirmAccount) {
                this.$router.push('/account/create')
            }

            this.$store.dispatch('loadProjects', {
                creator: this.$store.getters.getUser.id
            })
                .catch(error => {
                    Snackbar.open({
                        message: error.message,
                        position: 'is-top',
                        actionText: 'Close',
                        duration: 5000
                    })
                })
        }
    }
</script>

<style lang="scss">
    .b-account-page__content {
        margin-top: 40px;
    }

    .b-account-page__heading {
        margin-bottom: 15px;
    }

    .b-project__budget {
        margin-left: 15px;
    }
</style>
