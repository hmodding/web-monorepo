<template>
  <div class="container">
    <section class="my-3">
      <h1>Raft mods directory</h1>
      <p>
        Here is a list of all raft mods that have been published on our site. If
        you are missing something or have a great new idea, feel free to contact
        us on our <a href="/discord" target="_blank">Discord server</a>.
      </p>
    </section>
    <section class="my-3">
      <mod-searcher :default-query="defaultQuery" @search="onSearch" />
    </section>
    <mods-card-deck
      v-if="!loading"
      :mods="mods"
      v-show="!loading"
      group-cls="my-3"
      class="search-result"
    />
    <loading-spinner v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMods } from '../compositions';

import ModsCardDeck from '../components/ModsCardDeck.vue';
import Icon from '../components/Icon.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ModSearcher from '../components/ModSearcher.vue';
import { setDocumentTitle } from '../utils';
import { useActiveMeta } from 'vue-meta';

export default defineComponent({
  name: 'ModsPage',
  components: { ModSearcher, LoadingSpinner, Icon, ModsCardDeck },
  setup() {
    const meta = useActiveMeta();
    const defaultQuery = {
      sort: '-createdAt',
    };

    meta.title = 'Mods';
    meta.ogTitle = meta.titleTemplate('Mods');

    return {
      defaultQuery,
      ...useMods(defaultQuery),
    };
  },
  beforeRouteEnter() {
    setDocumentTitle('Mods');
  },
});
</script>

<style scoped lang="scss">
.serarch-result {
  min-height: 50vh;
}
</style>
