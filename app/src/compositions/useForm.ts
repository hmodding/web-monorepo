import { JsonFormsChangeEvent } from '@jsonforms/vue';
import { computed, ref, SetupContext } from 'vue';

export const useForm = (ctx: SetupContext) => {
  const { emit } = ctx;

  const formLoading = ref(false);
  const data = ref<any>({});
  const errors = ref<any>(null);
  const showErrors = ref(false);
  const ready = ref(false);

  const errorCount = computed(() => {
    return Object.keys(errors.value)?.length || 0;
  });

  function onFormChange(event: JsonFormsChangeEvent) {
    const changed = JSON.stringify(event.data) !== JSON.stringify(data.value);
    data.value = event.data;
    errors.value = event.errors;
    emit('change', { ...event, changed });
  }

  return {
    data,
    errors,
    showErrors,
    ready,
    errorCount,
    formLoading,
    onFormChange,
  };
};
