<script setup >
import { useStore } from '~~/stores/store';
import { onMounted } from 'vue';
const store = useStore()
onMounted(() => {
  store.updateLanguage()
})
  const nuxtApp = useNuxtApp();
  const loading = ref(false);

  nuxtApp.hook("page:start", () => {
    loading.value = true;
  });
  nuxtApp.hook("page:finish", () => {
    loading.value = false;
  });
</script>

<template>
    <div v-if="loading && store.updateLanguage()" class="loading-page">
      <div class="gooey">
        <span class="dot"></span>
        <div class="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </template>
  
<style lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #fff, $alpha: 0.95);
  z-index: 111;

  .gooey {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 142px;
    height: 40px;
    margin: -20px 0 0 -71px;
    background: rgba($color: #fff, $alpha: 0.75);
    filter: contrast(20);
    border-radius: 12px;
    .dot {
      position: absolute;
      width: 16px;
      height: 16px;
      top: 12px;
      left: 15px;
      filter: blur(4px);
      background: #000;
      border-radius: 50%;
      transform: translateX(0);
      animation: dot 2s infinite;
    }
    .dots {
      transform: translateX(0);
      margin-top: 12px;
      margin-left: 31px;
      animation: dots 2s infinite;
      span {
        display: block;
        float: left;
        width: 16px;
        height: 16px;
        margin-left: 16px;
        filter: blur(4px);
        background: #000;
        border-radius: 50%;
      }
    }
  }

  @keyframes dot {
    50% {
      transform: translateX(96px);
    }
  }

  @keyframes dots {
    50% {
      transform: translateX(-31px);
    }
  }
}
</style>