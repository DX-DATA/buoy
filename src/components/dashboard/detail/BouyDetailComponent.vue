<template>
  <div class="detail-container">
    <div>라인 1</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 2</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 3</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 4</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 5</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 6</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 7</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 8</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 9</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
    <div>라인 10</div>
    <div>ㅇㅅㅇㅅㅇㅅㅇ</div>
  </div>
</template>

<script>
export default {
  props: { name: String },
  setup(props) {
    console.log(props.name);
  },
};
</script>

<style scoped>
.detail-container {
  padding: 0px 48px 0px 48px;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
}
</style>
