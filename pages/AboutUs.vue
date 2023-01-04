<template>
  <div class="about">
    <div class="container">
      <!-- hero -->
      <div class="about__hero">
        <div class="about__hero-img">
          <img src="@/assets/images/jpg/biz-haqmizda.jpg" alt="" />
        </div>
        <h3 class="about__hero-title">EVR.UZ Platformasi</h3>
        
        <p class="about__hero-text" v-html="about.data.content">
        
        </p>
        <div class="about__hero-btns">
          <a class="about__hero-contact-btn" href="#">Biz bilan aloqa</a>
          <a class="about__hero-advertising-btn" href="#">Reklama xizmatlari</a>
        </div>
      </div>

      <div class="about__selcts">
        <h2 class="about__selcts-title">Ko’p beriladigan savollar</h2>
        <select-item v-for="select in selectApi.data" :key="select" :selectItem="select"/>
      </div>
    </div>
  </div>
</template>
<script setup> 
  const about = await $fetch('http://evr.bjst.uz/api/about', {
    method: "GET"
  })
  const selectApi = await $fetch('http://evr.bjst.uz/api/faq/index', {
    method: "GET"
  })
  
</script>