<script setup lang="ts">
type IconType = 's' | 'r' | 'b'; //solid, regular, brand
type IconSize = 'xs'
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
interface IconProps {
  name: string,
  type?: IconType,
  size?: IconSize,
  title?: string
}

withDefaults(defineProps<IconProps>(), {type: 's'});
</script>

<template>
  <i
    class="icon mx-1"
    :class="[`fa${type}`, `fa-${name}`, size ? `fa-${size}` : null]"
    :title="title"
  ></i>
</template>
