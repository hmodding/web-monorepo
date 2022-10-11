import { reactive } from 'vue';

interface AnswerDefinition {
  confirm: (value?: unknown) => any;
  cancel: (reason?: any) => any;
}

export const useModalAnswer = () => {
  const answer = reactive<AnswerDefinition>({
    confirm: () => null,
    cancel: () => null,
  });

  const waitForAnswer = async () => {
    const promise = new Promise((resolve, reject) => {
      answer.confirm = resolve;
      answer.cancel = reject;
    });

    try {
      await promise;
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    answer,
    waitForAnswer,
  };
};
