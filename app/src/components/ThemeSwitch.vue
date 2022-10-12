<template>
  <button
    class="btn btn-outline-secondary text-center"
    :title="`Turn ${!isLightTheme ? 'on' : 'off'} the lights`"
    @click="toggleTheme"
  >
    {{ isLightTheme ? '🌑' : '☀' }}
  </button>
</template>

<script lang="ts">
import { Theme } from 'State';
import { defineComponent } from 'vue';

import { setTheme, state } from '../modules/stateManager';

export default defineComponent({
  name: 'ThemeSwitch',
  setup() {
    return {
      state,
    };
  },
  computed: {
    theme(): Theme {
      return state.theme;
    },
    isLightTheme(): boolean {
      return this.theme === 'light';
    },
  },
  methods: {
    toggleTheme(): void {
      setTheme(this.isLightTheme ? 'dark' : 'light');
    },
  },
});
</script>