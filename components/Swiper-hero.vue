<template>
  <Swiper :pagination="{ clickable: true }" :modules="modules" class="hero__item" >
    <SwiperSlide class="swiper-slide" v-for="item in heroSw" :key="item">
      <!-- player -->
      <div @click.prevent="playHero = !playHero" v-if="!playHero" class="hero__player">
        <img src="@/assets/images/svg/player.svg" alt="" />
      </div>
      <img 
      v-if="!playHero"
        class="hero__img"
        :src="`http://evr.bjst.uz${item.image}`"
        alt=""
        
      />
      
      <YouTube v-if="playHero" class="hero__video" width="100%" height="600px" :src="item.url"/>

      <div class="hero__text-wrapper" v-if="!playHero">
        <h5 class="hero__text-wrapper__subtitle">Dunyo</h5>
        <h2 class="hero__text-wrapper__title">
          {{item.title}}
        </h2>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
<script>
import { defineComponent } from 'vue'
import YouTube from 'vue3-youtube'
import { Pagination } from "swiper";
import { ref,onMounted } from 'vue';
import "swiper/css";

import "swiper/css/pagination";
export default defineComponent({
  components: { YouTube },
    methods: {
        onReady() {
            this.$refs.youtube.playVideo()
        },
    },
  async setup() {
    const playHero = ref(false)
    const HeroSwiper = await $fetch("http://evr.bjst.uz/api/corusel/index", {
    method: "GET",
    } );
    const heroSw = HeroSwiper.data;
    
    return {
      heroSw,
      playHero,
      modules: [Pagination],
    };
  },
})
</script>
