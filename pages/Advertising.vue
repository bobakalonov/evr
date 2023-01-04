<template>
  <div class="ad">
    <div class="container">
      <div class="ad__selcts">
        <h2 class="ad__selcts-title">Reklama shartlari</h2>
        <select-item v-for="select in selectApi.data" :key="select" :selectItem="select"/>

        <!-- tel number -->
        <div class="ad__selcts-tel-number">
          <h3 class="ad__selcts-tel-number__subtitle">Qo’ng’iroq qiling</h3>
          <h2 class="ad__selcts-tel-number__number">
            <img src="@/assets/images/svg/tel.svg" alt="" /> +998 97 628 28 82
          </h2>
          <p class="ad__selcts-tel-number__description">
            Reklama bilan bog’liq istalgan savolingiz bo’lsa biz bilan aloqaga
            chiqing
          </p>
          <img
            class="ad__selcts-tel-number__img"
            src="@/assets/images/png/telephone.png"
            aria-required="false"
            alt=""
          />
        </div>
      </div>

      <div class="ad__right">
        <!-- latest news -->
        <div class="ad__right-latest-news__list__title">So’ngi yangiliklar</div>
        <div class="ad__right-latest-news__list">
          <SmallItem v-for="item in smaLnews" :key="item" :sItem="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const lastNews = await $fetch("http://evr.bjst.uz/api/news/last-news", {
  method: "GET",
});
const about = await $fetch('http://evr.bjst.uz/api/about', {
    method: "GET"
  })
  const selectApi = await $fetch('http://evr.bjst.uz/api/faq/index', {
    method: "GET"
  })
const smaLnews = lastNews.data.last_news;
</script>

