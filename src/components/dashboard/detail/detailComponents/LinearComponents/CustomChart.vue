<template>
  <LineChart :chartData="lineData" :options="lineOption" />
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ref, computed } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

export default {
  components: {
    LineChart,
  },
  props: { chartData: Object },
  setup(props) {
    const label = ref([]);
    const labelName = ref('');
    const data = ref([]);
    const title = ref('');

    const lineData = computed(() => ({
      labels: label.value,
      datasets: [
        {
          label: labelName.value,
          data: data.value,
          pointBackgroundColor: 'white',
          borderWidth: 2,
          borderColor: '#black',
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
          text: title,
          position: 'top',
        },
      },
    });

    onMounted(() => {
      label.value = props.chartData.label;
      data.value = props.chartData.data;
      labelName.value = props.chartData.name;
      title.value = props.chartData.title;
    });

    return { lineData, lineOption };
  },
};
</script>

<style></style>
