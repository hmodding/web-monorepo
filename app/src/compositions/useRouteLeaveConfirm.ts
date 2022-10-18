import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useModalAnswer } from './useModalAnswer';

export const useRouteLeaveConfirm = () => {
  const { answer, waitForAnswer } = useModalAnswer();
  const hasUnsavedChanges = ref<boolean>(false);
  const show = ref<boolean>(false);

  onBeforeRouteLeave(async () => {
    if (!!hasUnsavedChanges.value) {
      show.value = true;
      return await waitForAnswer();
    }
  });

  function onRouteLeaveConfirm(): void {
    answer.confirm();
  }

  function onRouteLeaveCancel(): void {
    answer.cancel();
    show.value = false;
  }

  return {
    answer,
    showModal: show,
    hasUnsavedChanges,
    onRouteLeaveConfirm,
    onRouteLeaveCancel,
  };
};
