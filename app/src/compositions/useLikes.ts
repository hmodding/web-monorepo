import { Ref } from 'vue';
import { ModDto } from '../../../shared/dto/ModDto';

export const useLikes = (mod: Ref<ModDto | null>) => {
  const onToggleLike = (isLiked: boolean) => {
    console.log('onToggleLike', isLiked, mod.value?.likeCount);
    if (mod.value) {
      if (isLiked) {
        mod.value.likeCount++;
      } else {
        mod.value.likeCount--;
      }
    }
  };

  return {
    onToggleLike,
  };
};

