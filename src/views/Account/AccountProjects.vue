<template>
  <div class="b-account-projects">
    <Header />
    <div class="box container b-account-projects__content">
      <h1 class="heading b-account-projects__heading">
        Ваши проекты:
      </h1>
      <hr>
      <div class="box b-account-project">
        <div class="b-account-project__header">
          <h3 class="heading b-account-project__title">
            Название проекта
          </h3>
          <button>Удалить проект</button>
        </div>
        <div class="box b-account-project__task">
          <span class="b-account-project__time">
            Время: 00:00
          </span>
          <span class="b-account-project__heading">
            Задание 1
          </span>
          <button class="b-account-project__toggle">
            Включить / Выключить
          </button>
          <button class="b-account-project__good">
            Задание выполнено
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Header from '@/components/core/Header'

    export default {
        name: "AccountProjects",
        components: {
            Header
        }
    }
</script>

<style lang="scss">
    .b-account-projects__content {
        margin-top: 40px;
    }

    .b-account-projects__heading {
        margin-bottom: 0;
    }

    .b-account-project__title {
        margin-bottom: 0;
    }

    .b-account-project__task {
        display: flex;
        align-items: center;
    }

    .b-account-project__good {
        margin-left: 15px;
    }

    .b-account-project__toggle {
        margin-left: auto;
    }

    .b-account-project__time {
        margin-right: 15px;
    }

    .b-account-project__heading {
        font-weight: bold;
        font-size: 18px;
    }

    .b-account-project__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }
</style>
