<template>
  <div class="container">
    <div class="nav">
      <Nav />
    </div>

    <div class="header-nav">
      <Header />
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/dashboard/layout/NavMenu.vue';
import Header from '../../components/dashboard/layout/Header.vue';
export default {
  components: { Nav, Header },
  setup() {},
};
</script>

<style scoped>
.container {
  margin: 0px;
  padding: 0px;
  display: grid;
  background: #e6e7eb;
  grid-template-columns: 0.15fr 1fr;
  grid-template-rows: 101px 1fr;
  grid-template-areas:
    'nav header'
    'nav content';
}

.nav {
  position: sticky;
  height: 100vh;
  top: 0px;
  margin: 0px;
  grid-area: nav;
}

.header-nav {
  grid-area: header;
  background: white;
  padding: 0px 48px 0px 48px;
}

.content {
  grid-area: content;
  background: white;
}

@media screen and (max-width: 767px) {
  .container {
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
  }

  .nav {
    margin: 0px;
    background: white;
    height: 10vh;
  }

  .header {
  }

  .content {
  }

  /* 모바일 */
}
</style>
