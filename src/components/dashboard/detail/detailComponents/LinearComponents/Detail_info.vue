<template>
  <div class="detail-info">
    <hr />

    <div class="detail-item">
      <div class="detail-text full">부표별 상세 정보</div>
      <div></div>
    </div>
    <div class="bouy-grid">
      <BoySpecify
        v-for="data in bouyData"
        :key="data"
        :data="data"
        v-on:click="onClickBouyImg(data)"
      />
    </div>

    <div class="detail-item">
      <div class="detail-text">부표 개수</div>
      <div class="table-grid">
        <span class="title-text">스마트 부표</span>
        <span class="title-text">일반 부표</span>
        <span class="content-text">10개</span>
        <span class="content-text" v-if="!state.modify">90개</span>
        <span class="content-text" v-if="state.modify"
          ><input type="text" class="modify-text" :value="90"
        /></span>
      </div>
    </div>

    <div class="detail-item">
      <div class="detail-text">라인 정보</div>
      <div class="table-grid">
        <span class="title-text">현재 높이</span>
        <span class="title-text">현재 무게</span>
        <span class="content-text">30cm</span>
        <span class="content-text">50kg</span>
      </div>
    </div>

    <div class="modify-wrapper">
      <div class="modify" v-on:click="onClickModify" v-if="!state.modify">
        개수 수정
      </div>
      <div class="modify2" v-on:click="onClickModify" v-if="state.modify">
        완료
      </div>
    </div>

    <hr />
    <div class="detail-item">
      <div class="detail-text">높이 이력</div>
      <LineChart :chartData="lineData" :options="lineOption" />
    </div>

    <div class="detail-item">
      <div class="detail-text">무게 이력</div>
      <LineChart :chartData="lineData2" :options="lineOption2" />
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
  </div>
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { ref, computed, reactive } from '@vue/reactivity';
import BoySpecify from './BoySpecify.vue';
import LineLocation from './LineLocation.vue';
Chart.register(...registerables);

export default {
  components: {
    LineChart,
    BoySpecify,
    LineLocation,
  },
  emits: ['onclickBouyMenu'],
  setup(props, context) {
    const lineData = computed(() => ({
      labels: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7],
      datasets: [
        {
          label: '라인 평균 높이',
          data: [1, 2, 3, 4, 5, 3, 3, 1, 2],
          pointBackgroundColor: 'white',
          borderWidth: 2,
          borderColor: '#77CEFF',
          pointBorderColor: 'black',
        },
      ],
    }));
    const lineOption = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: '일주간 높이 변화',
          position: 'top',
        },
      },
    });

    const lineData2 = computed(() => ({
      labels: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7],
      datasets: [
        {
          label: '라인 평균 무게',
          data: [21, 22, 23, 24, 25, 26, 27, 28, 29],
          pointBackgroundColor: 'white',
          borderWidth: 2,
          borderColor: '#black',
          pointBorderColor: 'black',
        },
      ],
    }));
    const lineOption2 = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: '일주간 무게 변화',
          position: 'top',
        },
      },
    });

    const bouyData = [
      { number: 1, height: '2', weight: '38', warn: false },
      { number: 2, height: '2', weight: '36', warn: false },
      { number: 3, height: '2.3', weight: '37', warn: true },
      { number: 4, height: '2', weight: '38', warn: false },
      { number: 5, height: '3', weight: '36', warn: false },
      { number: 6, height: '2', weight: '34', warn: false },
      { number: 7, height: '2.6', weight: '34', warn: true },
      { number: 8, height: '3', weight: '36', warn: false },
      { number: 9, height: '2', weight: '37', warn: true },
      { number: 10, height: '2', weight: '34', warn: false },
    ];

    function deleteLine() {
      confirm('라인을 삭제하시겠습니까?');
    }

    function onClickBouyImg(data) {
      context.emit('onclickBouyMenu', data);
    }

    let state = reactive({
      modify: false,
    });

    function onClickModify() {
      state.modify = !state.modify;
    }

    return {
      lineData,
      lineOption,
      bouyData,
      lineData2,
      lineOption2,
      deleteLine,
      onClickBouyImg,
      state,
      onClickModify,
    };
  },
};
</script>

<style scoped>
.detail-info {
  grid-column: 1 / 3;
  padding: 0px 30px 0px 30px;
  display: grid;
  display: flex;
  flex-direction: column;
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
}

.modify-text {
  width: 50px;
  height: 32px;
  font-size: 32px;
  text-align: center;
}
</style>
