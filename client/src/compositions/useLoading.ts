import { ref } from 'vue';

export const useLoading = () => {
  const loading = ref(false);

  return {
    loading,
  };
};
