import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        loader: true,
        navMenu: [],
        audioNews: [],
        smaLnews: [],
        society: [],
        specialSmall: [],
        specialLarge: [],
        interviewItems: [],
        interviewHero: [],
    }),
    actions: {
        async updateLanguage(l) {
            const navMenuList = await $fetch("http://evr.bjst.uz/api/category/index", {
                method: "GET",
                headers: {
                    "Accept-Language": l,
                },
            });
            const lastNews = await $fetch(`http://evr.bjst.uz/api/news/last-news`, {
                method: "GET",
                headers: {
                    'Accept-Language': l
                },
            });
            const SocietyNews = await $fetch(`http://evr.bjst.uz/api/news/society`, {
                method: "GET",
                headers: {
                    'Accept-Language': l
                },
            });
            const SpecialNews = await $fetch(`http://evr.bjst.uz/api/news/reade-more`, {
                method: "GET",
                headers: {
                    'Accept-Language': l
                },
            });
            const InterviewNews = await $fetch(`http://evr.bjst.uz/api/news/interview`, {
                method: "GET",
                headers: {
                    'Accept-Language': l
                },
            });

            this.navMenu = navMenuList.data;
            this.audioNews = lastNews.data.last_audio_news;
            this.smaLnews = lastNews.data.last_news;
            this.society = SocietyNews.data;
            this.specialSmall = SpecialNews.data.read_more_one;
            this.specialLarge = SpecialNews.data.read_more_two;
            this.interviewItems = InterviewNews.data.news_one;
            this.interviewHero = InterviewNews.data.news_two;
            this.loader = false
        }
    },
    getters: {

    }
})