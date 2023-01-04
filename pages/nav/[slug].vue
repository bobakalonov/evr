<script setup>
import { ref } from "vue";
const page = ref(1);
const slug = useRoute().params.slug;
console.log(slug);
const details = await $fetch(
  `http://evr.bjst.uz/api/category/category?id=14&page=${page}`,
  {
    method: "POST",
    headers: {
            'Accept-Language': 'en'
         },
    body: {
      slug,
    },
  }
);


const society = details.data.news_list;
const audio = details.data.audio_news;
const smaLnews = details.data.read_more;
const hero = details.data.news_one;

</script>

<template >
  <div class="category">
    <div class="container">
      <!-- left -->
      <div class="category__left">
        <!-- hero -->
        <category-hero :hItem="hero"/>
        <!-- list -->
        <div class="category__left-list">
          <ItemLarge v-for="item in society" :key="item" :lItem="item" />
        </div>
      </div>
      <!-- right -->
      <div class="category__right">
        <!-- audio list -->
        <h2 class="category__right-list__audios-title">Ovozli xabar</h2>
        <div class="category__right-list">
          <ItemAudio  :aItem="audio" />
        </div>

        <!-- Most read list -->
        <div class="category__right-most-read__list">
          <small-item v-for="item in smaLnews" :key="item" :sItem="item" />
        </div>
        <!-- reklama banner -->
        <div class="category__advertising"></div>
      </div>

    </div>
  </div>
</template>

<style>
.p {
  font-weight: 400;
  font-size: 12px;
  line-height: 30px;
}
</style>
