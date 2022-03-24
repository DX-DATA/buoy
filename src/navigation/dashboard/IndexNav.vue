<template>
  <div class="container">
    <div class="nav">
      <Nav />
    </div>

    <div class="header-nav padding">
      <Header />
    </div>

    <div class="content padding">
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
  grid-template-columns: 0.2fr 1fr;
  grid-template-rows: 0.05fr 1fr;
  grid-template-areas:
    'nav header'
    'nav content';
}

.padding {
  padding: 0px 3% 0px 3%;
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
  border-bottom: 1px solid #b3b3b3;
}

.content {
  grid-area: content;
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
