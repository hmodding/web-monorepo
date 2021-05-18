<template>
  <changelog
    :version="loaderVersion.rmlVersion"
    :readme="loaderVersion.readme"
    :release-date="loaderVersion.timestamp"
    :last-update="loaderVersion.updatedAt"
    software-name="RML LOADER"
    :download-url="loaderVersion.downloadUrl"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

import { LoaderVersion } from '../@types';
import api from '../modules/api';

import Changelog from '../components/Changelog.vue';

export default defineComponent({
  name: 'LoaderChangelogPage',
  components: { Changelog },
  setup() {
    const loaderVersion: Ref<LoaderVersion> = ref({});

    (async () => {
      const route: RouteLocationNormalizedLoaded = useRoute();
      loaderVersion.value = await api.getLoaderVersion(route.params.version);
    })();

    return {
      loaderVersion,
    };
  },
});
</script>
