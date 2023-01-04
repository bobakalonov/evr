<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from '~~/stores/store';

const store = useStore()

const event = reactive({
  weatherOpen: false,
  burgerNav: false,
  social: false,
  langOpen: false,
  searchBtn: false,
  overlay: false,
  scrolledNav: false,
  weather: [
    {
      id: "w",
      name: "fergana",
    },
    {
      id: "w01",
      name: "namangan",
    },
    {
      id: "w02",
      name: "andijon",
    },
    {
      id: "w03",
      name: "toshkent",
    },
    {
      id: "w04",
      name: "qoraqalpoq",
    },
    {
      id: "w05",
      name: "samarqand",
    },
    {
      id: "w06",
      name: "xorazm",
    },
    {
      id: "w07",
      name: "buxoro",
    },
    {
      id: "w09",
      name: "navoiy",
    },
    {
      id: "w09",
      name: "qashqadaryo",
    },
    {
      id: "w10",
      name: "jizzax",
    },
    {
      id: "w11",
      name: "sirdaryo",
    },
  ],
});

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
  getWeather()
  store.updateLanguage()
});
const searchItems = ref(null);
async function updateSearchItems(e) {
  let res = await $fetch("http://evr.bjst.uz/api/news/search", {
    method: "POST",
    body: {
      search: e.target.value,
    },
  });
  console.log(res);
  if(res.data == undefined) {
    return setTimeout(() => searchItems.value = res.success, 500)
  } else {
    return setTimeout(() => searchItems.value = res.data.items, 500)
  }
}
// open burger
function openNav() {
  event.overlay = !event.overlay
  event.burgerNav = !event.burgerNav
}
// lang
let lang = ref("UZ");

let updateLang = function (langs) {
  if (langs === "uz") {
    lang.value = "UZ";
  }
  if (langs === "ru") {
    lang.value = "RU";
  }
  if (langs === "en") {
    lang.value = "EN";
  }
};


// scroll header top
const updateScroll = () => {
  const scrollposition = window.scrollY;
  if (scrollposition > 150) {
    event.scrolledNav = true;
    return;
  }
  event.scrolledNav = false;

};

// weather
let vil = ref(null);
let updateWeather = async function (viloyat) {
  const data = await $fetch(
    "http://api.weatherapi.com/v1/current.json?key=1f52a0a6619d4479a83122537220705&q=" +
      viloyat,
    {
      method: "GET",
    }
  );
  console.log(data);
  if (viloyat === viloyat) {
    vil.value = `${viloyat} ${data.current.temp_c}`;
  }
};
let getWeather = async function() {
  const data = await $fetch(
    "http://api.weatherapi.com/v1/current.json?key=1f52a0a6619d4479a83122537220705&q=fergana",
    {
      method: "GET",
    }
  );
  console.log(data);
  if (data) {
    vil.value = `${data.location.name} ${data.current.temp_c}`;
  }
}

const socialMedia = await $fetch("http://evr.bjst.uz/api/networks/index", {
  method: "GET",
});


</script>

<template>
    

  <div class="overlay" @click="event.burgerNav = false, event.overlay = false,event.searchBtn = false" v-if="event.overlay"></div>
  <!-- social media -->
  <div class="social-media" :class="{ socialMediaActive: event.social }">
    <button class="arr" @click="event.social = !event.social">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="#FBD230"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <a :href="social.url" v-for="social in socialMedia.data" :key="social">
      <img :src="`http://evr.bjst.uz${social.image}`" :alt="social.title" />
    </a>
  </div>
  <!-- header -->
  <header class="header">
    <!-- header top -->
    <div class="header-top">
      
      <div class="container">
        <div
          class="header-top__weather-btn"
          @click="event.weatherOpen = !event.weatherOpen"
        >
          <img
            class="cloude-img"
            src="@/assets/images/svg/cloud.svg"
            aria-required="false"
            alt=""
          />
          <p>{{ vil }}</p>
          <img src="@/assets/images/svg/chevron-down.svg" alt="arr img" />
          <Transition name="fade">
            <ul v-if="event.weatherOpen">
              <li
                v-for="w in event.weather"
                :key="w.id"
                @click.prevent="updateWeather(w.name)"
              >
                <img
                  src="@/assets/images/svg/cloud.svg"
                  aria-required="false"
                  alt=""
                />
                {{ w.name }}
              </li>
            </ul>
          </Transition>
        </div>

        <div class="wrapper">
          <ul class="header-top__exchange-rate">
            <h5>{{ $t("kurs") }}</h5>
            <li class="header-top__exchange-rate-item">USD 11571.99</li>
            <li class="header-top__exchange-rate-item">EUR 12792.83</li>
            <li class="header-top__exchange-rate-item">RUB 110.56</li>
          </ul>
          <div class="header-top__nav">
            <NuxtLink to="/AboutUs">{{ $t("about") }}</NuxtLink>
            <NuxtLink to="/ContactView">{{ $t("contact") }}</NuxtLink>
            <NuxtLink to="/Advertising">{{ $t("ad") }}</NuxtLink>
          </div>
        </div>
        <div class="header-top__lang-btn" @click="event.langOpen = !event.langOpen">
          <svg
            class="globus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#FBD230"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12H22"
              stroke="#FBD230"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
              stroke="#FBD230"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ lang }}
          <svg
            class="arr"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Transition name="fade">
            <div class="lang-wrapper" v-if="event.langOpen">
              <div
                class="lang-wrapper__item"
                value="uz"
                @click="store.updateLanguage('uz'),updateLang($i18n.locale = 'uz')">
                UZ
              </div>
              <div
                class="lang-wrapper__item"
                value="ru"
                @click="store.updateLanguage('ru'),updateLang($i18n.locale = 'ru')">
                RU
              </div>
              <div
                class="lang-wrapper__item"
                value="en"
                @click="store.updateLanguage('en'),updateLang($i18n.locale = 'en')">
                EN
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- header burger nav -->
    <div class="header-burger-nav" :class="{ bur: event.burgerNav }">
      <div class="container">
        <div class="header-burger-nav__top">
          <button
            class="header-burger-nav__close-btn"
            @click="event.burgerNav = !event.burgerNav, event.overlay = false"
          >
            <img src="@/assets/images/svg/close.svg" alt="" />
          </button>
          <div class="header-burger-nav__lang">
            <svg
              class="globus"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12H22"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="header-burger-nav__lang-list">
              <div
                  class="header-burger-nav__lang-list-item"
                  value="uz"
                  @click="updateLang($i18n.locale = 'uz')"
                >
                  UZ
                </div>
                <div
                  class="header-burger-nav__lang-list-item"
                  value="ru"
                  @click="updateLang($i18n.locale = 'ru')"
                >
                  RU
                </div>
                <div
                  class="header-burger-nav__lang-list-item"
                  value="en"
                  @click="
                    updateLang($i18n.locale = 'en')
                  "
                >
                  EN
                </div>
            </div>
          </div>
          <ul class="header-burger-nav__navlist">
            <li class="header-burger-nav__navlist-item">
              <NuxtLink @click="event.burgerNav = false,event.overlay = false" to="/">Asosiy</NuxtLink>
            </li>
            <li
              class="header-burger-nav__navlist-item"
              v-for="nav in store.navMenu"
              :key="nav"
            >
              <NuxtLink
                @click="event.burgerNav = false,event.overlay = false"
                :to="`/nav/${nav.slug}`"
                >{{ nav.title }}</NuxtLink
              >
            </li>
          </ul>
        </div>
        <hr />
        <div class="header-burger-nav__bottom">
          <ul class="header-burger-nav__bottom-list">
            <li class="header-burger-nav__bottom-list__item">
              <NuxtLink to="/AboutUs">{{ $t("about") }}</NuxtLink>
            </li>
            <li class="header-burger-nav__bottom-list__item">
              <NuxtLink to="/ContactView">{{ $t("contact") }}</NuxtLink>
            </li>
            <li class="header-burger-nav__bottom-list__item">
              <NuxtLink to="/Advertising">{{ $t("ad") }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- header bottom -->
    <div class="header-bottom" :class="{ 'scrolled-nav': event.scrolledNav }">
      <div class="container">
        <NuxtLink to="/" class="header-bottom__logo">
          <img src="@/assets/images/svg/site-logo.svg" alt="site logo" />
        </NuxtLink>
        <ul class="header-bottom__list">
          <li class="header-bottom__item">
            <NuxtLink to="/">Asosiy</NuxtLink>
          </li>
          <li class="header-bottom__item" v-for="nav in store.navMenu" :key="nav">
            <NuxtLink :to="`/nav/${nav.slug}`">{{ nav.title }}</NuxtLink>
          </li>
        </ul>
        <button @click="openNav()" class="burger-btn">
          <img src="@/assets/images/svg/burger.svg" alt="" />
        </button>
        <button
          class="header-bottom__form-open"
          @click="(event.searchBtn = true), (event.overlay = true)"
        >
          <img src="@/assets/images/svg/search.svg" alt="" />
        </button>

        
      </div>
    </div>
    <Transition name="search">
          <form
            @submit.prevent=""
            v-if="event.searchBtn"
            class="header-bottom__form"
            action="#"
          >
            <div class="header-bottom__form-wr">
              <input
                class="header-bottom__input"
                type="text"
                placeholder="qidiruv"
                @input="updateSearchItems"
              />
              <div
                class="header-bottom__close"
                @click="(event.searchBtn = false), (event.overlay = false), searchItems = ''"
              >
                <img src="@/assets/images/svg/cl.svg" alt="" />
              </div>
              <ul class="search-list" v-if="updateSearchItems">
                <NuxtLink :to="`/news/${item.slug}`" v-for="item in searchItems" :key="item" @click="event.searchBtn = false, event.overlay = false, searchItems = ''">{{ item.title }}</NuxtLink>
              </ul>
              <!-- <h3 >{{ searchItems }}</h3> -->
            </div>
          </form>
        </Transition>
  </header>

  <main>
    <NuxtPage/>
  </main>

  <!-- footer -->
  <footer class="footer">
    <div class="container">
      <!-- footer left -->
      <div class="footer__left">
        <a class="footer__logo" href="./index.html">
          <img src="@/assets/images/svg/site-logo-y.svg" alt="" />
        </a>
        <p class="footer__text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s, when an
          unknown printer took
        </p>
        <div class="footer__b"></div>
      </div>

      <!-- footer right -->
      <div class="footer__right">
        <h4 class="footer__social-media__title">
          Ijtimoiy tarmoqlarda kuzating
        </h4>
        <div class="footer__social-media">
          <a href="#">
            <img src="@/assets/images/svg/Instagramm.svg" alt="" />
          </a>
          <a href="#">
            <img src="@/assets/images/svg/Telegram.svg" alt="" />
          </a>
          <a href="#">
            <img src="@/assets/images/svg/Faceebook.svg" alt="" />
          </a>
          <a href="#">
            <img src="@/assets/images/svg/Youtube.svg" alt="" />
          </a>
        </div>
        <h4 class="footer__download-title">Yuklab oling</h4>
        <div class="footer__download">
          <a href="#"
            ><img src="@/assets/images/png/google-play.png" alt=""
          /></a>
          <a href="#"><img src="@/assets/images/png/app-store.png" alt="" /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.search-enter-from,
.search-leave-to {
  opacity: 0;
  width: 0;
}
.search-enter-active,
.search-leave-active {
  transition: 0.5s;
}

</style>