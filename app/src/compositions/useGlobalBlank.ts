import { ref } from 'vue';

const blank = ref(false);

export const useGlobalBlank = () => {
  return {
    blank,
  };
};

export const setGlobalBlank = (value: boolean) => {
  blank.value = value;
};
