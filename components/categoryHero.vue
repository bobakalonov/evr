<template>
  <div class="category__left-hero" v-if="updateHero()">
    <img src="@/assets/images/jpg/voice-img.jpg" alt="" />
    <div class="category__left-wrapper">
      <h5 class="category__left-wrapper__subtitle">Dunyo</h5>
      <h2 class="category__left-wrapper__title">
        {{ hItem.title }}
      </h2>
    </div>
  </div>
</template>
<script setup>
const { hItem } = defineProps(["hItem"]);
const updateHero = () => {
  if (hItem !== null) {
    return true;
  } else {
    return false;
  }
};
</script>
