import { Ref } from 'vue';
import { ModDto } from '../../../shared/dto/ModDto';

export const useLikes = (mod: Ref<ModDto>) => {
  const onToggleLike = (isLiked: boolean) => {
    console.log('onToggleLike', isLiked, mod.value?.likes);
    if (mod.value) {
      if (isLiked) {
        mod.value.likes = mod.value.likes ? mod.value.likes++ : 1;
      } else {
        mod.value.likes = mod.value.likes ? mod.value.likes-- : 0;
      }
    }
  };

  return {
    onToggleLike,
  };
};

