import { JsonFormsChangeEvent } from '@jsonforms/vue';
import { ref, SetupContext } from 'vue';
import { LoaderVersion } from '../types';
import { useForm } from './useForm';
import { useLoading } from './useLoading';
import useRouteLeaveConfirm from './useRouteLeaveConfirm';

export const useAddLauncherVersion = (ctx: SetupContext) => {
  const form = useForm(ctx);
  const routeLeaveConfirm = useRouteLeaveConfirm();
  const ready = ref(false);

  (async () => {
    ready.value = true;
  })();

  function onChange(event: JsonFormsChangeEvent) {
    if (JSON.stringify(event.data) !== JSON.stringify(form.data.value)) {
      routeLeaveConfirm.hasUnsavedChanges.value = true;
    }
    form.data.value = event.data as LoaderVersion;
    form.errors.value = event.errors;
  }

  return {
    ...routeLeaveConfirm,
    ...form,
    ...useLoading(),
    ready,
    onChange,
  };
};
