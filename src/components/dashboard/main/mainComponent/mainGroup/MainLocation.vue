<template>
  <div class="map-container" ref="map"></div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';

export default {
  props: {
    location: Object,
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
        center: new kakao.maps.LatLng(props.location.center.lat, props.location.center.lon),
        level: 3,
      };

      let icon = new kakao.maps.MarkerImage('/pin.svg', new kakao.maps.Size(18, 18));

      let kakao_map = new kakao.maps.Map(ref(map).value, options);

      let center = {
        lat: (props.location.sw.lat + props.location.ne.lat) / 2,
        lon: (props.location.sw.lon + props.location.ne.lon) / 2,
      };

      let markerPosition = new kakao.maps.LatLng(center.lat, center.lon);
      let marker = new kakao.maps.Marker({
        position: markerPosition,
        image: icon,
      });

      let sw = new kakao.maps.LatLng(props.location.sw.lat, props.location.sw.lon); // 사각형 영역의 남서쪽 좌표
      let ne = new kakao.maps.LatLng(props.location.ne.lat, props.location.ne.lon); // 사각형 영역의 북동쪽 좌표

      // 사각형을 구성하는 영역정보를 생성합니다
      // 사각형을 생성할 때 영역정보는 LatLngBounds 객체로 넘겨줘야 합니다
      let rectangleBounds = new kakao.maps.LatLngBounds(sw, ne);

      // 지도에 표시할 사각형을 생성합니다
      let rectangle = new kakao.maps.Rectangle({
        bounds: rectangleBounds, // 그려질 사각형의 영역정보입니다
        strokeWeight: 2, // 선의 두께입니다
        strokeColor: '#FF7777', // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'shortdashdot', // 선의 스타일입니다
        fillColor: '#FF7777', // 채우기 색깔입니다
        fillOpacity: 0.4, // 채우기 불투명도 입니다
      });

      // 지도에 사각형을 표시합니다
      rectangle.setMap(kakao_map);
      marker.setMap(kakao_map);
    }

    return { props, map };
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 300px;
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
