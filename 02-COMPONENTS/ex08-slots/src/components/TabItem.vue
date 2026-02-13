<template>
  <div v-show="active">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  active: Boolean
})
</script>