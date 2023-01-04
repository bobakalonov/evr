<template>
  <div class="contact">
    <div class="container">
      <div class="contact__left">
        <div class="contact__left-wrapper">
          <form class="contact__left-wrapper_form" action="#">
            <h2 class="contact__left-wrapper_title">Biz bilan aloqa</h2>
            <div class="contact__left-wrapper_input-w">
              <h5 class="contact__left-wrapper_input-title">Ism</h5>
              <input
                class="contact__left-wrapper_input"
                type="text"
                placeholder="ismingizni kiriting.."
                required
              />
            </div>
            <div class="contact__left-wrapper_input-w">
              <h5 class="contact__left-wrapper_input-title">Telefon raqami</h5>
              <input
                class="contact__left-wrapper_input"
                type="number"
                placeholder="ismingizni kiriting.."
                required
              />
            </div>
            <div class="contact__left-wrapper_input-w">
              <h5 class="contact__left-wrapper_input-title">Xabaringiz</h5>
              <textarea
                class="contact__left-wrapper_input"
                required
                placeholder="Xabaringizni yozing"
              ></textarea>
            </div>
            <button class="contact__left-wrapper_btn">Yuborish</button>
          </form>
          <img
            class="contact__left-wrapper_img"
            src="@/assets/images/jpg/contact.jpg"
            alt=""
          />
        </div>
        <div class="contact__left-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d338.4501062553466!2d71.78208167614072!3d40.38272413237529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb83a4e74c1d51%3A0x74f191ca540db19!2siTeach%20Academy!5e0!3m2!1sru!2s!4v1669399939603!5m2!1sru!2s"
            width="789"
            height="533"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div class="contact__right">
        <!-- latest news -->
        <h2 class="contact__right-latest-news__list__title">
          So’ngi yangiliklar
        </h2>
        <div class="contact__right-latest-news__list">
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
const smaLnews = lastNews.data.last_news;
</script>
