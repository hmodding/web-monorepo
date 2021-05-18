<template>
  <transition name="fade">
    <cookie-consent-modal />
  </transition>
  <the-main-nav />
  <div id="scrollable-content">
    <router-view />
    <the-main-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TheMainNav from './components/TheMainNav.vue';
import TheMainFooter from './components/TheMainFooter.vue';
import CookieConsentModal from './components/modals/CookieConsentModal.vue';

export default defineComponent({
  name: 'App',
  components: { CookieConsentModal, TheMainFooter, TheMainNav },
  mounted() {
    setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 1);
  },
});
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

#scrollable-content {
  height: calc(100vh - #{$main-nav-height});
  max-height: calc(100vh - #{$main-nav-height});
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > ::v-deep(.container) {
    margin-top: auto;
    margin-bottom: auto;
  }
}
</style>
