<script setup lang="ts">
import { computed } from 'vue';
import { setTheme } from '../store/actions/theme.actions';
import { state } from '../store/store';

const theme = computed(() => state.theme);
const isLightTheme = computed(() => theme.value === 'light');

const toggleTheme = () => setTheme(isLightTheme.value? 'dark' : 'light');
</script>

<template>
  <button
    class="btn btn-outline-secondary text-center"
    :title="`Turn ${!isLightTheme ? 'on' : 'off'} the lights`"
    @click="toggleTheme"
  >
    {{ isLightTheme ? '🌑' : '☀' }}
  </button>
</template>
