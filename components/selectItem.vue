<template>
  <!-- select -->
  <div class="select" :class="{ open: event.selectOpen }" @click="openSelect()">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    {{ selectItem.title }}
    <p :class="{ open: event.selectOpen }" id="select-text">
      {{ selectItem.description }}
    </p>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
    const event = reactive({
        selectOpen: true
    })
    function openSelect() {
        event.selectOpen = !event.selectOpen
    }
    const { selectItem } = defineProps(['selectItem'])
</script>
