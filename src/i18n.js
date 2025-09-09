import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ms from "./locales/ms.json";

// check localStorage for saved lang
const savedLocale = localStorage.getItem("app-locale") || "ms";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLocale,   // load saved locale
  fallbackLocale: "en",
  messages: { en, ms }
});

// 🔹 watcher: save to localStorage whenever locale changes
i18n.global.localeWatcher = (newLocale) => {
  localStorage.setItem("app-locale", newLocale);
};

export default i18n;
