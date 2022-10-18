import { ref } from 'vue';
import { ModDto } from '../../../shared/dto/ModDto';
import { QueryParams } from '../../../shared/types/QueryParams';

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
    }, 1000); //min download time
  }

  onSearch(defaultQuery);

  return {
    loading,
    mods,
    loadMods,
    onSearch,
  };
};
