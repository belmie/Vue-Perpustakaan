<template>
  <header class="header-component">
    <dx-toolbar class="header-toolbar">
      <!-- menu button -->
      <dx-item
        :visible="menuToggleEnabled"
        location="before"
        css-class="menu-button"
      >
        <template #default>
          <dx-button
            icon="menu"
            styling-mode="text"
            @click="toggleMenuFunc"
          />
        </template>
      </dx-item>

      <!-- title -->
      <dx-item
        v-if="title"
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <div>{{ title }}</div>
      </dx-item>

      <!-- theme switcher -->
      <dx-item location="after">
        <div><theme-switcher /></div>
      </dx-item>

      <!-- 🔹 language switcher -->
      <dx-item location="after">
        <dx-select-box
          :items="languages"
          display-expr="label"
          value-expr="code"
          v-model="localeValue"
          width="120"
        />
      </dx-item>

      <!-- user panel -->
      <dx-item
        location="after"
        locate-in-menu="auto"
        menu-item-template="menuUserItem"
      >
        <template #default>
          <user-panel :menu-items="userMenuItems" menuMode="context" />
        </template>
      </dx-item>

      <template #menuUserItem>
        <user-panel :menu-items="userMenuItems" menuMode="list" />
      </template>
    </dx-toolbar>
  </header>
</template>

<script>
import DxButton from "devextreme-vue/button";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import DxSelectBox from "devextreme-vue/select-box";
import auth from "../auth";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
import UserPanel from "./user-panel";
import ThemeSwitcher from "./theme-switcher.vue";
import { useI18n } from "vue-i18n";

export default {
  props: {
    menuToggleEnabled: Boolean,
    title: String,
    toggleMenuFunc: Function,
    logOutFunc: Function
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const { t, locale } = useI18n();

    const email = ref("");
    auth.getUser().then((e) => (email.value = e.data.email));

     // 🔹 list of supported languages + flags
    const languages = [
      { code: "en", label: "🇬🇧 English" },
      { code: "ms", label: "🇲🇾 Melayu" },
      { code: "ja", label: "🇯🇵 日本語" }
    ];

    // 🔹 load saved locale from localStorage, fallback ke current locale
    const savedLocale = localStorage.getItem("app-locale") || locale.value;
    const localeValue = ref(savedLocale);
    locale.value = savedLocale;

    // 🔹 update vue-i18n locale + save ke localStorage bila tukar
    watch(localeValue, (newVal) => {
      locale.value = newVal;
      localStorage.setItem("app-locale", newVal);
    });

    function onLogoutClick() {
      auth.logOut();
      router.push({
        path: "/login-form",
        query: { redirect: route.path }
      });
    }

    function onProfileClick() {
      router.push({
        path: "/profile",
        query: { redirect: route.path }
      });
    }

    const userMenuItems = [
      {
        text: t("profile"),
        icon: "user",
        onClick: onProfileClick
      },
      {
        text: t("logout"),
        icon: "runner",
        onClick: onLogoutClick
      }
    ];

    return {
      email,
      t,
      userMenuItems,
      languages,
      localeValue
    };
  },
  components: {
    ThemeSwitcher,
    DxButton,
    DxToolbar,
    DxItem,
    DxSelectBox,
    UserPanel
  }
};
</script>


<style lang="scss">
@use "../dx-styles.scss" as *;

header {
  background-color: var(--base-bg);
}

.header-component {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.dx-toolbar.header-toolbar .dx-toolbar-items-container .dx-toolbar-after {
  padding: 0 40px;

  .screen-x-small & {
    padding: 0 20px;
  }
}

.dx-toolbar .dx-toolbar-item.dx-toolbar-button.menu-button {
  width: $side-panel-min-width;
  text-align: center;
  padding: 0;
}

.header-title .dx-item-content {
  padding: 0;
  margin: 0;
}

.dx-theme-generic {
  .dx-toolbar {
    padding: 10px 0;
  }

  .user-button > .dx-button-content {
    padding: 3px;
  }
}
</style>
