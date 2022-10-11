import { ref, Ref } from 'vue';
import { ModDto } from '../../../shared/dto/ModDto';

import { ModQueryParams } from '../../../shared/types/ModQueryParams';
import { api } from '../modules/api';

export const useMods = (defaultQuery?: ModQueryParams) => {
  const loading: Ref<boolean> = ref(false);
  const mods: Ref<ModDto[]> = ref([]);

  const loadMods = async (params: ModQueryParams) => {
    mods.value = await api.getMods(params);
  };

  const onSearch = async (query: any) => {
    if (loading.value) return;

    loading.value = true;
    await loadMods(query);

    setTimeout(() => {
      loading.value = false;
    }, 3000); //3s min downloading duration
  };

  onSearch(defaultQuery);

  return {
    loading,
    mods,
    loadMods,
    onSearch,
  };
};
