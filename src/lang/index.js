import VueI18n from 'vue-i18n'
import Vue from 'vue'
import cn from './cn'
import en from './en'
import * as Storage from '../utils/localStorage'

Vue.use(VueI18n)

const messages = {
  cn,
  en
}

let locale = Storage.getLocale()
if (!locale) {
  locale = 'cn'
  Storage.setLocale(locale)
}

const i18n = new VueI18n({
  messages,
  locale
})
export default i18n
