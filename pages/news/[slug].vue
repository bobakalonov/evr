<template>
  <Head>
    <Title>Evr News | {{ details.data.news_detail.title }}</Title>
    <Meta name="description" :content="details.data.news_detail.title" />
  </Head>
  <div class="info">
    <div class="container">
      <div class="info__left">
        <div class="info__left-header">
          <div class="info__left-date-w">
            <div class="date">
              <img src="@/assets/images/svg/date.svg" alt="" />
              {{ details.data.news_detail.date }}
            </div>
            <div class="view">
              <img src="@/assets/images/svg/view.svg" alt="" />
              {{ details.data.news_detail.count_view }}
            </div>
          </div>
          <div class="info__social-media">
            <span>Ulashing</span>
            <a :href="social.url" v-for="social in socialMedia.data" :key="social">
              <img src="@/assets/images/svg/Faceebook.svg" :alt="social.title"/>
            </a>
          </div>
        </div>
        <img
          class="info__left-img"
          :src="`http://evr.bjst.uz${details.data.news_detail.image}`"
          alt=""
        />
        <h3 class="info__left-title">{{ details.data.news_detail.title }}</h3>
        <div class="info__left-audio-w" v-if="audioUpdate()">
          <h5 class="info__left-audio-title">Xabarni tinglang</h5>
          <audio class="info__left-audio" :src="`http://evr.bjst.uz${details.data.news_detail.audio}`" controls></audio>
        </div>
        <div class="info__left-i" v-html="details.data.news_detail.content"></div>

        <!-- tag -->
        <div class="info__tags">
          <NuxtLink :to="`/tag/${tag}`" v-for="tag in details.data.news_detail.tag" :key="tag">#{{ tag }}</NuxtLink>
        </div>
      </div>
      <div class="info__right">
        <!-- latest news -->
        <h2 class="info__right-latest-news__list__title">So’ngi yangiliklar</h2>
        <div class="info__right-latest-news__list">
          <SmallItem
            v-for="item in details.data.last_news"
            :key="item"
            :sItem="item"
          />
        </div>
        <!-- interesting -->
        <h2 class="info__right-interesting__list__title">
          Qiziq bo’lishi mumkin
        </h2>
        <div class="info__right-interesting__list">
          <SmallItem
            v-for="item in details.data.last_news"
            :key="item"
            :sItem="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const slug = useRoute().params.slug;
const details = await $fetch("http://evr.bjst.uz/api/news/news-detail/", {
  method: "POST",
  body: {
    slug,
  },
});
const socialMedia = await $fetch("http://evr.bjst.uz/api/networks/index", {
  method: "GET",
});

const audioUpdate = () => {
  if (details.data.news_detail.audio !== null) {
    return true;
  } else {
    return false;
  }
};
</script>
