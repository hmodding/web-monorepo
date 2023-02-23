<template>
  <changelog
    :version="launcherVersion.version"
    :readme="launcherVersion.changelog"
    :release-date="launcherVersion.timestamp"
    :last-update="launcherVersion.updatedAt"
    software-name="RML LAUNCHER"
    :download-url="launcherVersion.downloadUrl"
    :downloadable="$route.params.downloadable"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import { api } from '../modules/api';
import { LauncherVersion } from '../types';

import { useActiveMeta } from 'vue-meta';
import Changelog from '../components/Changelog.vue';

export default defineComponent({
  name: 'LauncherChangelogPage',
  components: { Changelog },
  setup() {
    const meta = useActiveMeta();
    const launcherVersion: Ref<LauncherVersion> = ref({} as LauncherVersion);

    (async () => {
      const route = useRoute();
      launcherVersion.value = await api.getLauncherVersion(
        route.params.version as string,
      );

      meta.title = `RML Launcher v${launcherVersion.value.version}`;
    })();

    return {
      launcherVersion,
    };
  },
});
</script>