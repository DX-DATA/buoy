<template>
  <div></div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/api';
export default {
  setup() {
    let route = useRoute();
    let router = useRouter();
    onMounted(async () => {
      let result = await api._GET('user/oauth/naver', `?code=${route.query.code}&state=${route.query.state}`);

      console.log(result);

      if (result.code == 1) {
        document.cookie = 'token=' + result.token + '; path=/;';
        router.push('/');
      } else if (result.code == 0) {
        router.push({
          name: 'RegisterOauth',
          params: {
            title: '네이버',
            sns: '2',
            email: result.email,
            name: result.name,
          },
        });
      }
    });

    console.log(route.query);
  },
};
</script>

<style></style>
