import { ref } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { ModVersionDto } from '../../../shared/dto/ModVersionDto';
import { api } from '../modules/api';
import useLoading from './useLoading';
import useRouteLeaveConfirm from './useRouteLeaveConfirm';

export const useAddModVersion = () => {
  const meta = useActiveMeta();
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const route = useRoute();
  const ready = ref(false);
  const showErrors = ref(false);
  const modVersion = ref<ModVersionDto>();

  meta.title = 'Add mod Version';

  (async () => {
    modVersion.value = await api.getModVersion(Number(route.params.id));

    const raftVersions = await api.getRaftVersions();
    const { minRaftVersionId, maxRaftVersionId } = modVersion.value!;

    if (!minRaftVersionId) {
      modVersion.value!.minRaftVersionId =
        raftVersions[raftVersions.length - 1].id;
    }
    if (!maxRaftVersionId) {
      modVersion.value!.maxRaftVersionId = raftVersions[0].id;
    }

    ready.value = true;
  })();

  function onChange(event: { data: ModVersionDto; error: any[] }) {
    if (
      ready.value &&
      JSON.stringify(event.data) !== JSON.stringify(modVersion.value)
    ) {
      routeLeaveConfirm.hasUnsavedChanges.value = true;
    }
    modVersion.value = event.data;
  }

  return {
    ...routeLeaveConfirm,
    ...useLoading(),
    ready,
    showErrors,
    version: modVersion,
    onChange,
  };
};
