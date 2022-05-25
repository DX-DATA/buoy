<template>
  <div class="detail-info">
    <div class="detail-item">
      <div class="detail-text full">부표별 상세 정보</div>
      <div></div>
    </div>
    <div class="bouy-grid">
      <BoySpecify v-for="data in state.buoyData" :key="data" :data="data" v-on:click="onClickBouyImg(data)" />
    </div>

    <div class="detail-item" v-if="state.loading">
      <div class="detail-text">부표 개수</div>
      <div class="table-grid">
        <span class="title-text">스마트 부표</span>
        <span class="title-text"></span>
        <span class="content-text">{{ state.buoyData.length }}개</span>
        <span class="content-text"></span>
      </div>
    </div>

    <div class="detail-item" v-if="state.loading">
      <div class="detail-text">라인 정보</div>
      <div class="table-grid">
        <span class="title-text">현재 높이</span>
        <span class="title-text">현재 무게</span>
        <span class="content-text">{{ state.lineData.height.toFixed(2) }}cm</span>
        <span class="content-text">{{ state.lineData.weight.toFixed(2) }}kg</span>
      </div>
    </div>

    <div class="detail-item" v-if="state.loading">
      <div class="detail-text"></div>
      <div class="table-grid">
        <span class="title-text">현재 염분</span>
        <span class="title-text">현재 수온</span>
        <span class="content-text">{{ state.lineData.salinity.toFixed(2) }}psu</span>
        <span class="content-text">{{ state.lineData.water_temp.toFixed(2) }}℃</span>
      </div>
    </div>

    <hr />

    <div class="detail-item" v-for="line in state.history" :key="line">
      <div class="detail-text">{{ line.text }}</div>
      <CustomChart :chartData="line" />
    </div>

    <div class="detail-item">
      <div class="detail-text">라인 위치</div>
      <LineLocation />
    </div>

    <div class="detail-item">
      <div class="delete-line full">
        <button class="delete" v-on:click="deleteLine">삭제</button>
      </div>
      <div></div>
    </div>

    <div class="modify-wrapper"></div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import BoySpecify from './BoySpecify.vue';
import LineLocation from './LineLocation.vue';
import CustomChart from './CustomChart.vue';
import { onMounted } from '@vue/runtime-core';

export default {
  components: {
    BoySpecify,
    LineLocation,
    CustomChart,
  },
  props: { line: Object },
  emits: ['onclickBouyMenu'],
  setup(props, context) {
    let state = reactive({
      alloc: false,
      buoyData: [],
      loading: false,
      lineData: [],
      label: [],
      history: [],
    });

    onMounted(() => {
      if (props.line != undefined) {
        state.buoyData = props.line._buoy_list;
        state.lineData = props.line._line_info;
        setGraphData(props.line._history);
        state.loading = true;
      }
    });

    function setGraphData(arr) {
      let temp = [
        {
          data: [],
          label: [],
          name: '라인 평균 높이',
          title: '일주간 높이 변화',
          text: '높이 이력',
        },
        {
          data: [],
          label: [],
          name: '라인 평균 무게',
          title: '일주간 무게 변화',
          text: '무게 이력',
        },
        {
          data: [],
          label: [],
          name: '라인 평균 염도',
          title: '일주간 염도 변화',
          text: '염도 이력',
        },
        {
          data: [],
          label: [],
          name: '라인 평균 수온',
          title: '일주간 수온 변화',
          text: '수온 이력',
        },
      ];

      let label = [];

      arr.forEach((v) => {
        temp[0].data.unshift(v.height);
        temp[1].data.unshift(v.weight);
        temp[2].data.unshift(v.water_temp);
        temp[3].data.unshift(v.salinity);
        label.unshift(v.date);
      });

      temp.forEach((v) => {
        v.label = label;
      });

      state.history = temp;
    }

    function deleteLine() {
      confirm('라인을 삭제하시겠습니까?');
    }

    function onClickBouyImg(data) {
      context.emit('onclickBouyMenu', data);
    }

    function onClickAlloc() {
      state.alloc = !state.alloc;
    }

    return {
      deleteLine,
      onClickBouyImg,
      state,
      onClickAlloc,
    };
  },
};
</script>

<style scoped>
.detail-info {
  grid-column: 1 / 4;
  padding: 0px 30px 0px 30px;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border: 1px solid #c4c9d3;
  box-shadow: 4px 4px 7px rgba(189, 193, 215, 0.25);
  row-gap: 5px;
}

.table-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.detail-item {
  display: grid;
  margin-top: 15px;
  grid-template-columns: 0.2fr 1fr;
  align-items: center;
  justify-content: center;
}

.detail-text {
  font-weight: bold;
  font-size: 24px;
  font-family: 'GmarketSansMedium';
  text-align: center;
}

.bouy-grid {
  display: grid;
  width: 90%;
  margin: 0 auto;
  grid-template-columns: repeat(5, 1fr);
}

.full {
  grid-column: 1 / 3;
}

.title-text {
  font-weight: bold;
  font-size: 24px;
  font-family: 'GmarketSansMedium';
  text-align: center;
  color: #8d8682;
}

.content-text {
  font-weight: bold;
  font-size: 32px;
  font-family: 'GmarketSansMedium';
  text-align: center;
}

.delete-line {
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-end;
}

.delete {
  width: 120px;
  height: 60px;
  border: none;
  border-radius: 5px;
  background: rgb(211, 21, 21);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
}

.modify-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 12px 0px 12px 0px;
}

.modify {
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: rgb(25, 126, 16);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modify2 {
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: rgb(24, 65, 179);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.modify-text {
  width: 50px;
  height: 32px;
  font-size: 32px;
  text-align: center;
}
</style>
