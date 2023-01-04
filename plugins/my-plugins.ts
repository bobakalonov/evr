import { defineNuxtPlugin } from "#app";
import { Swiper,SwiperSlide } from "swiper/vue";


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Swiper,SwiperSlide)
})