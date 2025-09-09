<template>
  <div class="content-block">
    <footer class="footer">
      Hak Cipta © 2011-{{new Date().getFullYear()}} {{this.$appInfo.title}} Inc.
      <br />Semua tanda dagang atau tanda dagang berdaftar adalah milik pemiliknya masing-masing.
    </footer>
  </div>
</template>

<style lang="scss">
.footer {
  display: block;
  color: var(--base-text-color-alpha-7);
  border-top: 1px solid var(--footer-border-color);
  padding-top: 20px;
  padding-bottom: 24px;
  margin: 0 40px;

  .screen-x-small & {
    margin: 0 20px;
  }
}
</style>
