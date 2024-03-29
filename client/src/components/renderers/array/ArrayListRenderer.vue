<template>
  <fieldset v-if="control.visible" :class="styles.arrayList.root">
    <legend :class="styles.arrayList.legend">
      <button
        :class="styles.arrayList.addButton"
        @click="addButtonClick"
        type="button"
      >
        +
      </button>
      <label :class="styles.arrayList.label">
        {{ control.label }}
      </label>
    </legend>
    <div
      v-for="(element, index) in control.data"
      :key="`${control.path}-${index}`"
      :class="styles.arrayList.itemWrapper"
    >
      <array-list-element
        :moveUp="moveUp(control.path, index)"
        :moveUpEnabled="index > 0"
        :moveDown="moveDown(control.path, index)"
        :moveDownEnabled="index < control.data.length - 1"
        :delete="removeItems(control.path, [index])"
        :label="childLabelForIndex(index)"
        :styles="styles"
      >
        <dispatch-renderer
          :schema="control.schema"
          :uischema="childUiSchema"
          :path="composePaths(control.path, `${index}`)"
          :enabled="control.enabled"
          :renderers="control.renderers"
          :cells="control.cells"
        />
      </array-list-element>
    </div>
    <div v-if="noData" :class="styles.arrayList.noData">No data</div>
  </fieldset>
</template>

<script lang="ts">
import {
composePaths,
ControlElement,
createDefaultValue,
JsonFormsRendererRegistryEntry,
moveUp,
rankWith,
schemaTypeIs
} from '@jsonforms/core';
import {
DispatchRenderer,
rendererProps,
useJsonFormsArrayControl
} from '@jsonforms/vue';
import { defineComponent } from 'vue';
import { doNothing } from '../../../utils';
import { useVanillaArrayControl } from '../util';
import ArrayListElement from './ArrayListElement.vue';

const controlRenderer = defineComponent({
  name: 'array-list-renderer',
  components: {
    ArrayListElement,
    DispatchRenderer,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props) {
    const arrayControl = useVanillaArrayControl(useJsonFormsArrayControl(props));
    
    return {
      ...arrayControl,
      moveUp: arrayControl.moveUp || doNothing,
      moveDown: arrayControl.moveDown || doNothing,
      removeItems: arrayControl.removeItems || doNothing,
    }
  },
  computed: {
    noData(): boolean {
      return !this.control.data || this.control.data.length === 0;
    },
  },
  methods: {
    composePaths,
    createDefaultValue,
    addButtonClick() {
      this.addItem(
        this.control.path,
        createDefaultValue(this.control.schema),
      )();
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, schemaTypeIs('array')),
};
</script>
