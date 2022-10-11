import { Ref, ref } from 'vue';

export const useLoading = () => {
  const loading: Ref<boolean> = ref(false);

  return {
    loading,
  };
};
