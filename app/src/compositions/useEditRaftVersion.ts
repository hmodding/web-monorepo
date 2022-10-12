import { JsonFormsChangeEvent } from '@jsonforms/vue';
import dayjs from 'dayjs';
import { ref, SetupContext, watch } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { DATE_FORMAT } from '../const';
import { api } from '../modules/api';
import { Mod, RaftVersion } from '../types';
import { useForm } from './useForm';
import useRouteLeaveConfirm from './useRouteLeaveConfirm';

export interface ExtendedMod extends Mod {
  minRaftVersionId: number;
  maxRaftVersionId: number;
}

export const useEditRaftVersion = (ctx: SetupContext) => {
  const meta = useActiveMeta();
  const form = useForm(ctx);
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const route = useRoute();
  const ready = ref(false);
  const loading = ref(false);

  (async () => {
    const { id } = route.params;

    if (id) {
      form.data.value = await api.getRaftVersion(Number(id));
      form.data.value.releasedAt = dayjs(form.data.value.releasedAt).format(
        DATE_FORMAT,
      );
    }

    meta.title = `Edit Raft version v${form.data.value.version}`;
    ready.value = true;
  })();

  function onChange(event: JsonFormsChangeEvent) {
    if (JSON.stringify(event.data) !== JSON.stringify(form.data.value)) {
      routeLeaveConfirm.hasUnsavedChanges.value = true;
    }
    form.data.value = event.data as RaftVersion;
    form.errors.value = event.errors;
  }

  watch(
    () => form.data.value.version,
    (version) => {
      meta.title = `Edit Raft version ${version}`;
    },
  );

  return {
    ...routeLeaveConfirm,
    ...form,
    loading,
    ready,
    onChange,
  };
};
