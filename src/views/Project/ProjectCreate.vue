<template>
  <div class="b-project-create">
    <Header />
    <form
      class="box container b-project-create__content"
      @submit.prevent="onSubmit()"
    >
      <h1 class="heading b-project-create__heading">
        Create project
      </h1>
      <div class="field">
        <label class="label">
          Project name
        </label>
        <div class="control">
          <input
            v-model="form.name"
            class="input"
            type="text"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">
          Budget
        </label>
        <div class="control">
          <input
            v-model="form.budget"
            class="input"
            type="number"
          >
        </div>
      </div>
      <hr>
      <input
        type="submit"
        class="button is-fullwidth"
        value="Create project"
        :disabled="getLoading"
      >
    </form>
  </div>
</template>

<script>
    import { Snackbar } from 'buefy/dist/components/snackbar'
    import Header from '@/components/core/Header'

    export default {
        name: "ProjectCreate",
        components: {
            Header
        },
        data () {
            return {
                form: {
                    name: '',
                    budget: ''
                }
            }
        },
        computed: {
            getLoading: function () {
                return this.$store.getters.getLoading
            }
        },
        methods: {
            onSubmit: function () {
                if (this.form.name.length > 0 && this.form.budget.length > 0) {
                    const project = {
                        creator: this.$store.getters.getUser.id,
                        name: this.form.name,
                        budget: this.form.budget
                    }
                    this.$store.dispatch('createProject', project)
                        .then(() => {
                            Snackbar.open({
                                message: 'You create new project',
                                position: 'is-top',
                                actionText: 'Close',
                                duration: 5000
                            })
                          this.$router.push('/account')
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
        }
    }
</script>

<style lang="scss">
  .b-project-create__content {
    margin-top: 40px;
    max-width: 400px;
  }

  .b-project-create__heading {
    margin-bottom: 15px;
  }
</style>
