<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p class="error">{{ message }}</p>
</template>

<style scoped>
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-error);
}
</style>
