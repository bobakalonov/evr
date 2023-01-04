<template>
  <div class="large-item" v-if="updateLargeItem()">
    <div class="large-item__img">
      <img
        :src="`http://evr.bjst.uz${lItem.image}`"
        alt=""
        width="404"
        height="290"
      />
    </div>
    <div class="large-item__text-w">
      <NuxtLink to="/" href="#" class="large-item__subtitle">{{lItem.category_id}}</NuxtLink>
      <NuxtLink :to="`/news/${lItem.slug}`" href="#" class="large-item__title"
        >{{lItem.title}}
        </NuxtLink>
      <div class="large-item__bottom">
        <NuxtLink to="/" class="btn" href="#"
          >{{ lItem.category_id }}
          <img src="@/assets/images/svg/arrow.svg" aria-required="false" alt=""
        /></NuxtLink>

        <div class="large-item__bottom-w">
          <div class="date">
            <img src="@/assets/images/svg/date.svg" alt="" />
            {{lItem.date}}
          </div>
          <div class="view">
            <img src="@/assets/images/svg/view.svg" alt="" />
            {{lItem.count_view}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { lItem } = defineProps(['lItem'])
const updateLargeItem = () => {
  if (lItem !== null) {
    return true;
  } else {
    return false;
  }
};
</script>
