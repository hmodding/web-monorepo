import { computed, reactive, ref } from 'vue';
import { QueryParams } from '../../../shared/types/QueryParams';
import { emptyToNull } from '../utils';

export const useApiQuerying = () => {
  const sort = ref<string>();
  const search = ref<string>();
  const filter = reactive<Record<string, any>>({});

  const query = computed<QueryParams>({
    get() {
      return {
        sort: sort.value,
        q: search.value || null,
        ...emptyToNull(filter.value),
      };
    },
    set(query: QueryParams) {
      sort.value = query.sort;
      delete query.sort;
      search.value = query.search;
      delete query.search;
      filter.value = { ...query };
    },
  });

  return {
    search,
    sort,
    filter,
    query,
  };
};
