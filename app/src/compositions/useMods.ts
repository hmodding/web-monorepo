import { ref } from 'vue';
import { ModDto } from '../../../shared/dto/ModDto';
import { QueryParams } from '../../../shared/types/QueryParams';

import { MIN_LOADING_DURATION } from '../const';
import { api } from '../modules/api';

export const useMods = (defaultQuery: QueryParams = {}) => {
  const loading = ref<boolean>(false);
  const mods = ref<ModDto[]>([]);

  async function loadMods(params: QueryParams) {
    mods.value = await api.getMods(params);
  }

  async function onSearch(query: QueryParams): Promise<void> {
    if (loading.value) return;

    loading.value = true;
    await loadMods(query);

    setTimeout(() => {
      loading.value = false;
    }, MIN_LOADING_DURATION);
  }

  onSearch(defaultQuery);

  return {
    loading,
    mods,
    loadMods,
    onSearch,
  };
};
