<template>
  <div class="dollar-exchange">
    <h2 class="dollar-exchange__title">{{ $t("kurs") }}</h2>
    <div class="dollar-exchange__items">
      <div class="dollar-exchange__items__item">
        <h1>{{ usd.code }}:</h1>
        <p>{{ usd.cb_price }}</p>
      </div>
      <div class="dollar-exchange__items__item">
        <h1>{{ eur.code }}:</h1>
        <p>{{ eur.cb_price }}</p>
      </div>
      <div class="dollar-exchange__items__item">
        <h1>{{ rub.code }}:</h1>
        <p>{{ rub.cb_price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const currensy = await $fetch("https://nbu.uz/exchan    ge-rates/json", {
  method: "GET",
});
const usd = computed(() => {
  return currensy.find((item) => item.code === "USD");
});
const eur = computed(() => {
  return currensy.find((item) => item.code === "EUR");
});
const rub = computed(() => {
  return currensy.find((item) => item.code === "RUB");
});
</script>
