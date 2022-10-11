<template>
  <i
    class="icon mx-1"
    :class="[`fa${type}`, `fa-${name}`, size ? `fa-${size}` : null]"
    :title="title"
  ></i>
</template>

<script lang="ts">
import { size } from 'lodash';
import { type } from 'os';
import { title } from 'process';
import { defineComponent, PropType } from 'vue';

export type IconType = 's' | 'r' | 'b';
export type IconSize =
  | 'xs'
  | 'sm'
  | 'lg'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x';
export interface IconOptions {
  name: string;
  type?: IconType;
  size?: IconSize;
}

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<IconType>,
      default: 's',
      validator(type: string) {
        return ['s', 'r', 'b'].includes(type);
      },
    },
    size: {
      type: String as PropType<IconSize>,
      validator(type: IconSize) {
        return [
          'xs',
          'sm',
          'lg',
          '2x',
          '3x',
          '4x',
          '5x',
          '6x',
          '7x',
          '8x',
          '9x',
          '10x',
        ].includes(type);
      },
    },
    title: String,
  },
});
</script>
