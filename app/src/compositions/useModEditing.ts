import { computed, ref, watch } from 'vue';
import { useActiveMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { ModCreateDto } from '../../../shared/dto/ModDto';
import { api } from '../modules/api';
import { state } from '../modules/stateManager';
import { Mod } from '../types';
import { nullToUndefined, slugify } from '../utils';
import { useRouteLeaveConfirm } from './useRouteLeaveConfirm';

export interface ExtendedMod extends Mod {
  minRaftVersionId: number;
  maxRaftVersionId: number;
}

export const useModEditing = (create: boolean = false) => {
  const meta = useActiveMeta();
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const route = useRoute();
  const ready = ref(false);
  const loading = ref(false);
  const showErrors = ref(false);
  const mod = ref<ModCreateDto>({} as ModCreateDto);
  const errors = ref<any[]>([]);

  (async () => {
    if (route.params.id) {
      const found = await api.getMod(route.params.id as string);
      mod.value = nullToUndefined(found) as ModCreateDto;
    }

    const { category, minRaftVersionId, maxRaftVersionId, author } = mod.value;

    if (!category) {
      const categories = await api.getModCategories();
      mod.value.category = categories[0];
    }

    if (!minRaftVersionId || !maxRaftVersionId) {
      const raftVersions = await api.getRaftVersions();

      if (!minRaftVersionId) {
        mod.value.minRaftVersionId = raftVersions[raftVersions.length - 1].id;
      }

      if (!maxRaftVersionId) {
        mod.value.maxRaftVersionId = raftVersions[0].id;
      }

      if (!author) {
        mod.value.author = state.session!.user!.username;
      }
    }

    if (create) {
      meta.title = `Create new mod`;
    } else {
      meta.title = `Edit ${mod.value.title || 'MISSING_TITLE'}"`;
    }

    ready.value = true;
  })();

  if (create) {
    watch(
      () => mod.value.title,
      (title) => {
        if (!ready.value) return;

        mod.value.id = title ? slugify(title) : '';
        meta.title = `Edit ${mod.value.title || ''}`;
      },
    );
  }

  const errorCount = computed(() => Object.keys(errors.value).length);

  function onChange(event: { data: Record<string, any>; errors: any[] }) {
    if (JSON.stringify(event.data) !== JSON.stringify(mod.value)) {
      routeLeaveConfirm.hasUnsavedChanges.value = true;
    }

    mod.value = event.data as ModCreateDto;
    errors.value = event.errors;
  }

  return {
    ...routeLeaveConfirm,
    loading,
    ready,
    showErrors,
    mod,
    errors,
    errorCount,
    onChange,
  };
};
