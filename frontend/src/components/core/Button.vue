<template>
  <button
    :class="[
      'button',
      `button--${size}`,
      `button--${variant}`,
      { 'button--disabled': disabled }
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Sizes */
.button--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.button--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.button--lg {
  padding: 0.625rem 1.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

/* Variants */
.button--primary {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.button--primary:hover:not(.button--disabled) {
  background: var(--color-primary-accent);
  border-color: var(--color-primary-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.button--primary:active:not(.button--disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.button--secondary {
  background: var(--color-secondary);
  color: var(--color-text);
  border-color: var(--color-border);
}

.button--secondary:hover:not(.button--disabled) {
  background: var(--color-secondary-accent);
  border-color: var(--color-primary);
}

.button--outline {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.button--outline:hover:not(.button--disabled) {
  background: var(--color-primary);
  color: #fff;
}

/* Disabled state */
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}
</style>