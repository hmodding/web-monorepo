<template>
  <metainfo>
    <template v-slot:base="{ content }">
      {{ content }}
    </template>
    <template v-slot:title="{ content }">
      {{ content }}
    </template>
    <template v-slot:og(title)="{ content }">
      {{ content }}
    </template>
    <template v-slot:meta(title)="{ content }">
      {{ content }}
    </template>
  </metainfo>
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
import CookieConsentModal from './components/modals/CookieConsentModal.vue';
import TheMainFooter from './components/TheMainFooter.vue';
import TheMainNav from './components/TheMainNav.vue';
import { useGeneralMetaTags } from './compositions';

export default defineComponent({
  name: 'App',
  components: { CookieConsentModal, TheMainFooter, TheMainNav },
  setup() {
    useGeneralMetaTags();
  },
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
