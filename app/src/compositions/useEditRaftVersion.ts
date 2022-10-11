import dayjs from 'dayjs';
import { Ref, ref, SetupContext, watch } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { DATE_FORMAT } from '../const/formats.const';
import { api } from '../modules/api';
import { Mod } from '../types/Mod';
import { RaftVersion } from '../types/RaftVersion';
import { useForm } from './useForm';
import { useLoading } from './useLoading';
import { useRouteLeaveConfirm } from './useRouteLeaveConfirm';

export interface ExtendedMod extends Mod {
  minRaftVersionId: number;
  maxRaftVersionId: number;
}

export const useEditRaftVersion = (ctx: SetupContext) => {
  const meta = useActiveMeta();
  const form = useForm(ctx);
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const route = useRoute();
  const ready: Ref<boolean> = ref(false);

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

  function onChange(event: { data: object; errors: any[] }) {
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
    ...useLoading(),
    ready,
    onChange,
  };
};
