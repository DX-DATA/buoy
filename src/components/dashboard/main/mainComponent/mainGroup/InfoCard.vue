<template>
  <div class="right_message_wrapper" v-if="props.side == 'right'">
    <div class="right_message message warn-text">주의 하셔야 해요</div>
  </div>
  <div class="line" v-if="props.side == 'right'"><div class="circle"></div></div>
  <div class="card-container">
    <div class="icon"><img class="menu-svg" :src="src" /></div>
    <div class="description">{{ props.data.description }}</div>
    <div class="measure">{{ props.data.data }}</div>
  </div>
  <div class="line" v-if="props.side == 'left'"><div class="circle"></div></div>
  <div class="left_message message" v-if="props.side == 'left'">평균 높이입니다</div>
</template>

<script>
export default {
  props: {
    data: Object,
    side: String,
  },
  setup(props) {
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

.line {
  margin: 0 auto;
  width: 1px;
  background: #748bde;
  border: 4px solid #748bde;
}

.circle {
  border-radius: 100px;
  border: 18px solid #748bde;
  margin-top: 50px;
  margin-left: -17.5px;
}

.message {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  font-family: 'GmarketSansMedium';
}

.left_message {
  position: relative;
  margin: 50px 0px 30px 10px;
  width: 200px;
  height: 50px;
  background: white;
  border-radius: 60px;
}

.left_message:after {
  border-top: 15px solid white;
  border-left: 15px solid transparent;
  border-right: 0px solid transparent;
  border-bottom: 0px solid transparent;
  content: '';
  position: absolute;
  top: 15px;
  left: -14px;
}

.right_message_wrapper {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
}

.right_message {
  position: relative;
  margin: 50px 0px 30px 25px;
  width: 200px;
  height: 50px;
  background: white;
  border-radius: 60px;
}

.right_message:after {
  border-top: 15px solid rgb(255, 200, 30);
  border-left: 0px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 0px solid transparent;
  content: '';
  position: absolute;
  top: 15px;
  left: 199px;
}

.warn-text {
  background: rgb(255, 200, 30);
  color: black;
}
</style>
