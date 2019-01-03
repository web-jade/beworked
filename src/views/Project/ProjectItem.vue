<template>
  <div class="b-project-item">
    <Header />

    <div class="box container b-project-item__content">
      <div class="box">
        <button
          type="button"
          class="button"
          @click="isCreateTaskModalActive = !isCreateTaskModalActive"
        >
          + Create task
        </button>
      </div>
      <div class="box">
        <h1 class="heading">
          Project name: {{ $store.getters.getProjectByName(this.$route.params['project'])[0].name }}
        </h1>
        <hr>
        <h2 class="heading">
          Project budget: {{ $store.getters.getProjectByName(this.$route.params['project'])[0].budget }} rub.
        </h2>
      </div>
      <div
        v-for="task in $store.getters.getProjectByName(this.$route.params['project'])[0].tasks"
        :key="task.taskName"
        class="box b-project-item__task"
      >
        <strong>
          Task: {{ task.taskName }}
        </strong>
        <div class="b-project-item__buttons">
          <button
            type="button"
            class="button"
            :disabled="getLoading"
          >
            Start / Stop
          </button>
          <button
            type="button"
            class="button"
            @click="deleteTask(task.taskName)"
            :disabled="getLoading"
          >
            Delete
          </button>
        </div>
      </div>
      <strong v-if="!$store.getters.getProjectByName(this.$route.params['project'])[0].tasks">
        This project don't have any tasks
      </strong>
    </div>
    <BModal :active.sync="isCreateTaskModalActive">
      <form
        class="b-task-create box"
        @submit.prevent="onSubmit()"
      >
        <BField label="Task name">
          <BInput
            v-model="form.taskName"
            :required="true"
          />
        </BField>
        <input
          type="submit"
          class="button is-fullwidth"
          value="Create task"
        >
      </form>
    </BModal>
  </div>
</template>

<script>
    import { Snackbar } from 'buefy/dist/components/snackbar'
    import Header from '@/components/core/Header'

    export default {
        name: "ProjectItem",
        components: {
            Header
        },
        data () {
            return {
                isCreateTaskModalActive: false,
                form: {
                    taskName: ''
                }
            }
        },
        computed: {
            getLoading: function () {
                return this.$store.getters.getLoading
            }
        },
        created () {
            if (this.$store.getters.getUser.id !== this.$route.params['creator']) {
                this.$router.push('/account')
            }

            let matches = 0
            this.$store.getters.getProjects.forEach((item) => {
                if (item.name === this.$route.params['project']) {
                    matches++
                }
            })

            if (matches === 0) {
                this.$router.push('/account')
            }
        },
        methods: {
            onSubmit: function () {
                if (this.form.taskName) {
                  const task = {
                      creator: this.$store.getters.getUser.id,
                      projectName: this.$store.getters.getProjectByName(this.$route.params['project'])[0].name,
                      taskName: this.form.taskName
                  }
                  this.$store.dispatch('createTask', task)
                      .then(() => {
                          this.isCreateTaskModalActive = !this.isCreateTaskModalActive
                          Snackbar.open({
                              message: 'You create new task',
                              position: 'is-top',
                              actionText: 'Close',
                              duration: 5000
                          })
                      })
                      .catch(error => {
                          Snackbar.open({
                              message: error.message,
                              position: 'is-top',
                              actionText: 'Close',
                              duration: 5000
                          })
                      })
                    this.form.taskName = ''
                }
            },
            deleteTask: function (taskName) {
                const task = {
                    creator: this.$store.getters.getUser.id,
                    projectName: this.$store.getters.getProjectByName(this.$route.params['project'])[0].name,
                    taskName: taskName
                }
                this.$store.dispatch('deleteTask', task)
                    .then(() => {
                        Snackbar.open({
                            message: `You delete (${taskName})`,
                            position: 'is-top',
                            actionText: 'Close',
                            duration: 5000
                        })
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
</script>

<style lang="scss">
  .b-project-item__content {
    margin-top: 40px;
  }

  .b-project-item__task {
    display: flex;
    align-items: center;
  }

  .b-project-item__buttons {
    margin-left: auto;
    display: flex;
    align-items: center;

    .button:not(:last-child) {
      margin-right: 15px;
    }
  }
</style>
