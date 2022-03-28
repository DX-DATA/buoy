<template>
  <div class="map-container" ref="map"></div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';

export default {
  props: {
    data: Object,
  },
  setup(props) {
    let map = ref(null);

    onMounted(() => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(initMap);
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6f658858e3f911133199902d12e31f4b';
        document.head.appendChild(script);
      }
    });

    function initMap() {
      var options = {
        center: new kakao.maps.LatLng(34.7972552, 128.4642089),
        level: 3,
      };

      let kakao_map = new kakao.maps.Map(ref(map).value, options);

      let markerPosition = new kakao.maps.LatLng(34.7972552, 128.4642089);
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(kakao_map);
    }

    return { props, map };
  },
};
</script>

<style scoped>
.map-container {
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
</style>
