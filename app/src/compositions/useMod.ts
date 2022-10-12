import { computed, Ref } from 'vue';
import { state } from '../store/stateManager';
import { ModVersion } from '../types';
import { useRandom } from './useRandom';

export const useMod = (props: any) => {
  const { randomNumber } = useRandom();

  const isAuthor = computed<boolean>(() => {
    return state?.session?.user?.username === props.mod?.author;
  });

  const isAdmin = computed(() => {
    return state?.session?.user?.role === 'admin';
  });

  const versions = computed<ModVersion[]>(() => {
    return props.mod?.versions || [];
  });

  const currentVersion: Ref<ModVersion> = computed(() => {
    return (versions.value?.[0] || []) as ModVersion;
  });

  const currentVersionDownloads = computed<number>({
    get(): number {
      return currentVersion.value?.downloadCount || 0;
    },
    set(count: number): void {
      currentVersion.value.downloadCount = count;
    },
  });

  const totalDownloads = computed<number>(() => {
    if (props.preview) {
      return randomNumber();
    } else {
      return (
        versions.value
          ?.map((version) => version.downloadCount)
          .reduce((a, b) => a + b, 0) || 0
      );
    }
  });

  return {
    isAuthor,
    isAdmin,
    versions,
    currentVersion,
    currentVersionDownloads,
    totalDownloads,
  };
};
