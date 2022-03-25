<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style>
@font-face {
  font-family: 'NanumBarunGothicYetHangul';
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumBarunGothicYetHangul/NanumBarunGothic-YetHangul.eot);
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumBarunGothicYetHangul/NanumBarunGothic-YetHangul.eot?#iefix) format('embedded-opentype'), url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumBarunGothicYetHangul/NanumBarunGothic-YetHangul.woff2) format('woff2'),
    url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumBarunGothicYetHangul/NanumBarunGothic-YetHangul.woff) format('woff'), url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumBarunGothicYetHangul/NanumBarunGothic-YetHangul.ttf) format('truetype');
}

@font-face {
  font-family: 'GmarketSansMedium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

* {
  padding: 0px;
  margin: 0px;
}
</style>
