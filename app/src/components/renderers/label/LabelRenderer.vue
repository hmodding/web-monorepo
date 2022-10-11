<template>
  <label v-if="layout.visible" :class="styles.label.root">
    {{ layout.uischema.options?.text }}
  </label>
</template>

<script lang="ts">
import {
JsonFormsRendererRegistryEntry,
Layout,
rankWith, uiTypeIs
} from '@jsonforms/core';
import {
DispatchRenderer,
rendererProps,
useJsonFormsLayout
} from '@jsonforms/vue';
import { defineComponent } from 'vue';
import { useVanillaLayout } from '../util';

const labelRenderer = defineComponent({
  name: 'label-renderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props) {
    // reuse layout bindings for label
    return useVanillaLayout(useJsonFormsLayout(props));
  },
});

export default labelRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: labelRenderer,
  tester: rankWith(1, uiTypeIs('Label')),
};
</script>
