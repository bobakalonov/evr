<template>
  <div class="audio-item" v-if="audioItem()">
    <span class="audio-item__subtitle">{{aItem.category_id}}</span>
    <NuxtLink :to="`/news/${aItem.slug}`" class="audio-item__title"
      >{{aItem.title}}</NuxtLink>
    <div class="audio-item__date-w">
      <div class="date">
        <img src="@/assets/images/svg/date.svg" alt="" />
        {{ aItem.date }}
      </div>
      <div class="view">
        <img src="@/assets/images/svg/view.svg" alt="" />
        {{ aItem.count_view }}
      </div>
    </div>
    <audio
      class="audio-item__audio"
      :src="`http://evr.bjst.uz${aItem.audio}`"
      controls
    ></audio>
  </div>
</template>

<script setup>
  const { aItem } = defineProps(['aItem'])
  const audioItem = () => {
  if (aItem !== null) {
    return true;
  } else {
    return false;
  }
};
</script>