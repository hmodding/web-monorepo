<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { state } from '../store/store';
import { ModVersion } from '../types';

interface RaftVersionMatchingBadgeProps {
  modVersion?: ModVersion;
  to?: RouteLocationRaw;
}

const props = defineProps<RaftVersionMatchingBadgeProps>();

const component = computed<string>(() => props.to? 'router-link' : 'span');
const isUpToDate = computed<boolean>(() => props.modVersion?.maxRaftVersionId === state.latestRaftVersion!.id);
const isUntested = computed<boolean>(() => !isUpToDate.value && !props.modVersion?.definiteMaxRaftVersion);
const vLabel = computed<string>(() => {
  if (isUpToDate.value) {
    return 'Up to Date';
  } else if (isUntested.value) {
    return 'Untested';
  } else {
    return 'Outdated';
  }
});
const vTitle = computed<string>(() => {
  if (isUpToDate.value) {
    return 'The current version is up to date';
  } else if (isUntested.value) {
    return 'The current version is untested';
  } else {
    return 'The current version is outdated!';
  }
})
</script>

<template>
  <component
    :is="component"
    :to="to"
    class="badge badge-pill mx-1"
    :class="{
      'badge-success': isUpToDate,
      'badge-warning': !isUpToDate && isUntested,
      'badge-danger': !isUpToDate && !isUntested,
    }"
    :title="vTitle"
  >
    {{ vLabel }}
  </component>
</template>