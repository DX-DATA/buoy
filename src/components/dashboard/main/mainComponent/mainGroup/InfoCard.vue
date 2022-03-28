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
  width: 630px;
  height: 340px;
  margin: 100px auto 0px auto;
  background: #f8f8f8;
  box-shadow: 0px 4px 4px rgba(178, 178, 207, 0.44);
  border-radius: 15px;
  gap: 5px;
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-columns: 1.5fr 2fr;
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
  width: 144px;
}

.description {
  grid-area: description;
  width: 250px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 36px;
  font-family: 'GmarketSansMedium';
  text-align: center;
}

.measure {
  grid-area: measure;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 56px;
  font-family: 'GmarketSansMedium';
}
</style>
