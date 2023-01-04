  <template>

  <div class="small-item">
    <img
      class="small-item__img"
      :src="`http://evr.bjst.uz${sItem.image}`"
      :alt="sItem.title"
      width="143px"
      height="128px"
    />
    <div class="small-item__text-w">
      <span class="small-item__subtitle">MAHALLIY</span>
      <NuxtLink :to="`/news/${sItem.slug}`" class="small-item__title">{{sItem.title}}</NuxtLink>
      <div class="small-item__date-w">
        <div class="date">
          <img src="@/assets/images/svg/date.svg" alt="" />
          {{sItem.date}}
        </div>
        <div class="view">
          <img src="@/assets/images/svg/view.svg" alt="" />
          {{sItem.count_view}}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const { sItem } = defineProps(['sItem'])
</script>