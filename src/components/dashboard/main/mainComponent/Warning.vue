<template>
  <div class="warning"><img class="warn-svg" src="../../../../assets/warning.svg" /> {{ props.msg.buoy }} {{ props.msg.msg }}</div>
</template>

<script>
export default {
  props: {
    msg: Object,
  },
  setup(props) {
    return { props };
  },
};
</script>

<style scoped>
.warning {
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-top: 5px;
  color: #e87c40;
  font-size: 24px;
  font-family: 'GmarketSansMedium';
  font-weight: bold;
}

.warn-svg {
  width: 32px;
}
</style>
