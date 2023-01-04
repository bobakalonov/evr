import { createI18n } from 'vue-i18n'
import uz from '../locales/uz.json'
import en from '../locales/en.json'
import ru from '../locales/ru.json'

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'uz',
        messages: {
            en,
            uz,
            ru
        }
    })

    vueApp.use(i18n)
})