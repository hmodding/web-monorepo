<template>
  <div class="container">
    <section>
      <h1>Loader Version Management</h1>
      <router-link :to="{ name: 'addLoaderVersion' }" class="btn btn-success">
        <icon name="plus" class="mr-2" /> Add a version
      </router-link>
    </section>
    <section class="my-5">
      <div class="wide-content">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">RML Version</th>
              <th scope="col">Raft Version</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(version, i) in versions"
              :key="`version-${i}`"
              :class="{ 'table-success': i === 0 }"
            >
              <th scope="row">{{ version.rmlVersion }}</th>
              <td><router-link :to="{name: 'raftVersionManagement', hash: `#${version.raftVersion?.version}`}">{{ version.raftVersion?.title }}</router-link></td>
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
import { LoaderVersionDto } from '../../../shared/dto/LoaderVersionDto';
import Icon from '../components/Icon.vue';
import { api } from '../modules/api';
import { toDateStr } from '../utils';
export default defineComponent({
  components: { Icon },
  name: 'LoaderVersionManagement',
  setup() {
    const meta = useActiveMeta();
    const versions: Ref<LoaderVersionDto[]> = ref([]);

    meta.title = 'Raft versionm anagement';

    (async () => {
      versions.value = await api.getLoaderVersions() as LoaderVersionDto[];
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