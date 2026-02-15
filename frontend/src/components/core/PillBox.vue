<template>
  <span class="pill" :class="variant">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
});
</script>

<style scoped>
.pill {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
}

.default {
  background-color: var(--color-bg-card);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.success {
  background-color: var(--color-success);
  color: white;
  border: 1px solid var(--color-success);
}

.warning {
  background-color: var(--color-warning);
  color: white;
  border: 1px solid var(--color-warning);
}

.error {
  background-color: var(--color-error);
  color: white;
  border: 1px solid var(--color-error);
}

.info {
  background-color: var(--color-primary);
  color: white;
  border: 1px solid var(--color-primary);
}
</style>
