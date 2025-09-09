<template>
  <div
    :class="[swatchClassName, 'side-navigation-menu']"
    @click="forwardClick"
  >
    <slot />
    <div class="menu-container">
      <dx-tree-view
        ref="treeViewRef"
        :items="items"
        key-expr="path"
        selection-mode="single"
        :focus-state-enabled="false"
        expand-event="click"
        @item-click="handleItemClick"
        width="100%"
      />
    </div>
  </div>
</template>

<script>
import DxTreeView from "devextreme-vue/tree-view";
import { sizes } from "../utils/media-query";
import navigation from "../app-navigation";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { themeService } from "../theme-service";
import { useI18n } from "vue-i18n";

export default {
  props: {
    compactMode: Boolean
  },
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();

    const isLargeScreen = sizes()["screen-large"];

    // 🔹 recursive translate
    function translateNav(navItems) {
      return navItems.map((item) => {
        const path = item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path;
        return {
          ...item,
          text: t(item.text),
          path,
          expanded: isLargeScreen,
          items: item.items ? translateNav(item.items) : null
        };
      });
    }

    const items = ref(translateNav(navigation));
    const treeViewRef = ref(null);
    const swatchClassName = ref("");

    function forwardClick(...args) {
      context.emit("click", args);
    }

    function handleItemClick(e) {
      if (!e.itemData.path || props.compactMode) {
        return;
      }
      router.push(e.itemData.path);
      e.event.stopPropagation();
    }

    function updateSelection() {
      if (!treeViewRef.value || !treeViewRef.value.instance) {
        return;
      }
      treeViewRef.value.instance.selectItem(route.path);
      treeViewRef.value.instance.expandItem(route.path);
    }

    onMounted(() => {
      updateSelection();
      if (props.compactMode) {
        treeViewRef.value.instance.collapseAll();
      }
    });

    // 🔹 update bila route tukar
    watch(
      () => route.path,
      () => {
        updateSelection();
      }
    );

    // 🔹 update bila theme tukar
    watch(
      () => themeService.isDark,
      () => {
        swatchClassName.value = themeService.isDark.value
          ? "dx-swatch-additional-dark"
          : "dx-swatch-additional";
      },
      { immediate: true }
    );

    // 🔹 update bila language tukar
    watch(
      () => t("menu.home"), // reactive trigger
      () => {
        items.value = translateNav(navigation);
      }
    );

    return {
      treeViewRef,
      items,
      forwardClick,
      handleItemClick,
      updateSelection,
      swatchClassName
    };
  },
  components: {
    DxTreeView
  }
};
</script>

<style lang="scss">
@use "../variables.scss" as *;
@use "../dx-styles.scss" as *;

.dx-swatch-additional, .dx-swatch-additional-dark {
  &.side-navigation-menu {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
    width: 250px !important;
    background-color: var(--base-bg);

    .menu-container {
      min-height: 100%;
      display: flex;
      flex: 1;

      .dx-treeview {
        // ## Long text positioning
        white-space: nowrap;
        // ##

        .dx-treeview-node-container:empty {
          display: none;
        }

        // ## Icon width customization
        .dx-treeview-item {
          padding-left: 0;
          border-radius: 0;
          flex-direction: row-reverse;

          .dx-icon {
            width: $side-panel-min-width !important;
            margin: 0 !important;
          }
        }

        // ##

        // ## Arrow customization
        .dx-treeview-node {
          padding: 0 0 !important;
        }

        .dx-treeview-toggle-item-visibility {
          right: 10px;
          left: auto;
        }

        .dx-rtl .dx-treeview-toggle-item-visibility {
          left: 10px;
          right: auto;
        }
        // ##

        // ## Item levels customization
        .dx-treeview-node {
          &[aria-level="1"] {
            font-weight: bold;
          }

          &[aria-level="2"] .dx-treeview-item-content {
            font-weight: normal;
            padding: 0 $side-panel-min-width;
          }
        }
        // ##
      }
    }
  }
}
</style>
