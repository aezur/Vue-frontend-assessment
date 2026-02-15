<script setup>
defineProps({
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
});
</script>

<template>
  <div class="spinner-container">
    <div
      :class="['spinner', `spinner--${size}`]"
      role="status"
      aria-label="Loading"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner--sm {
  width: 1rem;
  height: 1rem;
  border-width: 2px;
}

.spinner--md {
  width: 2rem;
  height: 2rem;
}

.spinner--lg {
  width: 3rem;
  height: 3rem;
  border-width: 4px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
