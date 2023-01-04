<template>
  <div class="tag">
    <div class="container">
      <ItemLarge v-for="item in tagNews.data" :key="item" :lItem="item" />
    </div>
  </div>
</template>

<script setup>
const tag = useRoute().params.tag

const tagNews = await $fetch(`http://evr.bjst.uz/api/news/list/?tag=${tag}`, {
  method: "GET",
});
</script>
