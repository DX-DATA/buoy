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
        script.src =
          '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6f658858e3f911133199902d12e31f4b';
        document.head.appendChild(script);
      }
    });

    function initMap() {
      var options = {
        center: new kakao.maps.LatLng(34.7972552, 128.4642089),
        level: 1,
      };

      let icon = new kakao.maps.MarkerImage(
        '/pin.svg',
        new kakao.maps.Size(18, 18)
      );

      let linePath = [
        new kakao.maps.LatLng(34.7972552, 128.4642089),
        new kakao.maps.LatLng(34.7972552, 128.4641989),
        new kakao.maps.LatLng(34.7972552, 128.4641889),
        new kakao.maps.LatLng(34.7972552, 128.4641789),
        new kakao.maps.LatLng(34.7972552, 128.4641689),
        new kakao.maps.LatLng(34.7972552, 128.4641589),
        new kakao.maps.LatLng(34.7972552, 128.4641389),
      ];

      let polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 3, // 선의 두께 입니다
        strokeColor: 'red', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
      });

      let kakao_map = new kakao.maps.Map(ref(map).value, options);

      let markerPosition2 = new kakao.maps.LatLng(34.7972552, 128.4641389);
      let marker2 = new kakao.maps.Marker({
        position: markerPosition2,
        image: icon,
      });

      marker2.setMap(kakao_map);
      polyline.setMap(kakao_map, options);
    }

    return { props, map };
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 50vh;
  background: #f8f8f8;
  box-shadow: 0px 4px 4px rgba(178, 178, 207, 0.44);
  border-radius: 15px;
  gap: 5px;
  display: grid;
  justify-items: center;
  align-content: center;
  margin-bottom: 20px;
}
</style>
