import { reactive } from 'vue';
import { doNothing } from '../utils';

interface AnswerDefinition {
  confirm: (value?: unknown) => void;
  cancel: () => void;
}

export const useModalAnswer = () => {
  const answer: AnswerDefinition = reactive({
    confirm: doNothing,
    cancel: doNothing,
  });

  async function waitForAnswer() {
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
  }

  return {
    answer,
    waitForAnswer,
  };
};
