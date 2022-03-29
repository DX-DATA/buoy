<template>
  <div class="card-container">
    <div class="icon"><img class="menu-svg" :src="src" /></div>
    <div class="description">{{ props.data.description }}</div>
    <div class="measure">{{ props.data.data }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  setup(props) {
    console.log(props.data);

    let src = require(`../../../../../assets/${props.data.icon}.svg`);

    return { props, src };
  },
};
</script>

<style scoped>
.card-container {
  width: 220px;
  height: 120px;
  margin: 80px auto 0px auto;
  background: #f8f8f8;
  box-shadow: 0px 4px 4px rgba(178, 178, 207, 0.44);
  border-radius: 15px;
  padding: 5px;
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-columns: 0.6fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'icon description'
    'measure measure';
}

.icon {
  grid-area: icon;
  display: flex;
  align-items: center;
  padding: 5px 20px 5px 20px;
}

.icon > img {
  width: 62px;
}

.description {
  grid-area: description;
  width: 110px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  font-family: 'GmarketSansMedium';
  text-align: center;
  color: #7e8092;
}

.measure {
  grid-area: measure;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 32px;
  font-family: 'GmarketSansMedium';
}
</style>
