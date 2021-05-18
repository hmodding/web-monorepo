<template>
  <div class="container">
    <mod-details v-if="mod" :mod="mod" @like="onToggleLike" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Mod } from '../@types';
import ModDetails from '../components/ModDetails.vue';
import { useLikes } from '../compositions';
import api from '../modules/api';
import toaster from '../modules/toaster';
import { setDocumentTitle } from '../utils';

export default defineComponent({
  name: 'ModPage',
  components: {
    ModDetails,
  },
  setup() {
    const mod: Ref<Mod> = ref(null);

    (async () => {
      const route = useRoute();
      const router = useRouter();
      mod.value = await api.getMod(route.params.id as string);

      if (!mod.value) {
        const modId = route.params.id;
        await router.replace({ name: 'mods' });
        toaster.error(`Mod ${modId} not found`);
      }
    })();

    watch(
      () => mod.value?.title,
      (title: string) => {
        setDocumentTitle(title);
      },
    );

    return {
      mod,
      ...useLikes(mod),
    };
  },
});
</script>
