<template>
  <div class="detail-container">
    <div class="text">라인 1</div>
    <DetailLinear />
    <div class="text">라인 2</div>
    <DetailLinear />
    <div class="text">라인 3</div>
    <DetailLinear />
    <div class="text">라인 4</div>
    <DetailLinear />
    <div class="text">라인 5</div>
    <DetailLinear />
    <div class="text">라인 6</div>
    <DetailLinear />
    <div class="text">라인 7</div>
    <DetailLinear />
    <div class="text">라인 8</div>
    <DetailLinear />
    <div class="text">라인 9</div>
    <DetailLinear />
    <div class="text">라인 10</div>
    <DetailLinear />
  </div>
</template>

<script>
import DetailLinear from './detailComponents/DetailLinear.vue';
export default {
  components: { DetailLinear },
  props: { name: String },
  setup(props) {
    console.log(props.name);
    console.log('dtd');
  },
};
</script>

<style scoped>
.detail-container {
  padding: 48px 48px 0px 48px;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  row-gap: 20px;
}

.text {
  font-weight: bold;
  font-size: 32px;
}
</style>
