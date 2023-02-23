<template>
  <div class="container">
    <section>
      <h1>Launcher Version Management</h1>
      <router-link :to="{ name: 'addLauncherVersion' }" class="btn btn-success">
        <icon name="plus" class="mr-2" /> Add a version
      </router-link>
    </section>
    <section class="my-5">
      <div class="wide-content">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Launcher Version</th>
              <th scope="col">Downloads</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(version, i) in versions"
              :key="`version-${i}`"
              :class="{ 'table-success': i === 0 }"
            >
              <th scope="row">{{ version.version }}</th>
              <td>{{ version.downloadCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { LauncherVersionDto } from '../../../shared/dto/LauncherVersionDto';
import Icon from '../components/Icon.vue';
import { api } from '../modules/api';
import { toDateStr } from '../utils';
export default defineComponent({
  components: { Icon },
  name: 'LauncherVersionManagement',
  setup() {
    const meta = useActiveMeta();
    const versions: Ref<LauncherVersionDto[]> = ref([]);

    meta.title = 'Raft versionm anagement';

    (async () => {
      versions.value = await api.getLauncherVersions();
    })();

    return {
      versions,
    };
  },
  methods: {
    toDateStr,
  },
});
</script>