<template>
  
  <!-- hero -->
  <div class="hero">
    <div class="container">
      <swiper-hero />
    </div>
  </div>

  <!-- latest news -->
  <div class="latest-news">
    <div class="container">
      <h2 class="latest-news__title">So’ngi yangiliklar</h2>
      <div class="latest-news__inner-w">
        <!-- LEFT SECTION -->
        <div class="latest-news__left">

          <item-audio v-for="item in store.audioNews" :key="item" :aItem="item" />
        </div>
        <!-- RIGHT SECTION -->
        <div class="latest-news__right">
          <SmallItem v-for="item in store.smaLnews" :key="item" :sItem="item" />
        </div>
      </div>
    </div>
  </div>

  <!-- Society -->
  <div class="society">
    <div class="container">
      <!-- header -->
      <div class="society-header">
        <h2 class="society__title">Jamiyat</h2>
        <NuxtLink to="/nav/jamiyat" class="society__all-view-btn"
          ><p>Barchasini ko’rish</p>
          <img src="@/assets/images/svg/arrow.svg" aria-required="false" alt=""
        /></NuxtLink>
      </div>

      <!-- list -->
      <div class="society-list">
        <ItemLarge v-for="item in store.society" :key="item" :lItem="item" />
      </div>
    </div>
  </div>

  <!-- advertising -->
  <div class="advertising">
    <div class="container">
      <Swiper
      class="advertising__swiper"
        :slides-per-view="1"
        :navigation="true"
        :autoplay="{
          delay: 2500,
        }"
        :modules="modules"
      >
        <SwiperSlide class="advertising__swiper-slide" v-for="item in 5" :key="item">
          <img
            src="@/assets/images/jpg/Reklama.jpg"
            alt="Reklama bliss sharbat"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

  <!-- special -->
  <div class="special">
    <div class="container">
      <h2 class="special__title">Siz uchun maxsus</h2>
      <div class="special__list-w">
        <!-- left -->
        <div class="special__left-list">
          <SmallItem v-for="item in store.specialSmall" :key="item" :sItem="item" />
        </div>
        <!-- right -->
        <div class="special__right-list">
          <ItemLarge v-for="item in store.specialLarge" :key="item" :lItem="item" />
        </div>
      </div>
    </div>
  </div>

  <!-- Interview -->
  <div class="interview">
    <div class="container">
      <!-- header -->
      <div class="interview__header">
        <div class="interview__title">Intervyu</div>
        <NuxtLink to="/nav/intervyu" class="interview__all-view-btn"
          ><p>Barchasini ko’rish</p>
          <img src="@/assets/images/svg/arrow.svg" aria-required="false" alt=""
        /></NuxtLink>
      </div>
      <!-- main -->
      <div
        class="interview__main"
        v-for="item in store.interviewHero"
        :key="item"
      >
        <img
          v-if="!interviewVideo"
          class="interview__img"
          :src="`http://evr.bjst.uz${item.image}`"
          alt=""
        />
        <YouTube
          v-if="interviewVideo"
          class="hero__video"
          width="100%"
          height="600px"
          :src="item.url"
        />
        <div
          class="interview__player"
          v-if="!interviewVideo"
          @click.prevent="interviewVideo = !interviewVideo"
        >
          <img src="@/assets/images/svg/player.svg" alt="" />
        </div>
        <div class="interview__text-wrapper" v-if="!interviewVideo">
          <h5 class="interview__text-wrapper__subtitle">intervyu</h5>
          <h2 class="interview__text-wrapper__title">
            {{ item.title }}
          </h2>
        </div>
      </div>
      <!-- list -->
      <div class="interview__list">
        <ItemLarge
          v-for="interviewItem in store.interviewItems"
          :key="interviewItem"
          :lItem="interviewItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "~~/stores/store";
import YouTube from "vue3-youtube";
import { ref,defineComponent,onMounted } from "vue";
import { Pagination,Navigation } from "swiper";



export default defineComponent({
  components: { YouTube },
  methods: {
    onReady() {
      this.$refs.youtube.playVideo();
    },
  },
  async setup() {
    const store = useStore()
    const interviewVideo = ref(false);
    onMounted(() =>{
      store.updateLanguage()
    })
    

    return {
      store,
      
      modules: [Pagination,Navigation],
    };
  },
});
</script>
