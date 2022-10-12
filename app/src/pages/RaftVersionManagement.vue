<template>
  <div class="container">
    <section>
      <h1>Raft Version Management</h1>
      <router-link :to="{ name: 'addRaftVersion' }" class="btn btn-success">
        <icon name="plus" class="mr-2" /> Add a version
      </router-link>
    </section>
    <section class="my-5">
      <div class="wide-content">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Raft version</th>
              <th scope="col">Build ID</th>
              <th scope="col">Title</th>
              <th scope="col">Release date</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(version, i) in versions"
              :key="`version-${i}`"
              :class="{ 'table-success': i === 0, 'border border-primary': selectedVersion === version.version }"
            >
              <th scope="row">{{ version.version }}</th>
              <td>{{ version.buildId }}</td>
              <td>{{ version.title }}</td>
              <td>{{ toDateStr(version.releasedAt) }}</td>
              <td>
                <router-link
                  :to="{ name: 'editRaftVersion', params: { id: version.id } }"
                  class="btn btn-outline-primary btn-sm"
                >
                  Edit
                </router-link>
              </td>
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
import { useRoute } from 'vue-router';
import Icon from '../components/Icon.vue';
import { api } from '../modules/api';
import { RaftVersion } from '../types';
import { toDateStr } from '../utils';

export default defineComponent({
  components: { Icon },
  name: 'RaftVersionManagementPage',
  setup() {
    const meta = useActiveMeta();
    const route = useRoute();
    const versions: Ref<RaftVersion[]> = ref([]);

    meta.title = 'Raft versionm anagement';

    (async () => {
      versions.value = await api.getRaftVersions();
    })();

    return {
      versions,
      selectedVersion: route.hash?.substring(1) || ''
    };
  },
  methods: {
    toDateStr,
  },
});
</script>