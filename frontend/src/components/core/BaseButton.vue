<template>
  <button
    :type="$attrs.type || 'button'"
    :class="buttonClasses"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :aria-busy="loading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="button__spinner" aria-hidden="true"></span>
    <slot />
    <span v-if="loading" class="sr-only">Loading...</span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * Button size variant
   * @type {'sm' | 'md' | 'lg'}
   */

  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
  /**
   * Button style variant
   * @type {'primary' | 'secondary' | 'outline'}
   */
  variant: {
    type: String,
    default: "primary",
    validator: (v) => ["primary", "secondary", "outline"].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const isDisabled = computed(() => props.disabled || props.loading);
const buttonClasses = computed(() => [
  "button",
  `button--${props.size}`,
  `button--${props.variant}`,
  { "button--disabled": isDisabled.value },
]);

function handleClick(event) {
  if (!isDisabled.value) {
    emit("click", event);
  }
}
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
  position: relative;
}

.button:focus-visible:not(.button--disabled) {
  outline: none;
  box-shadow:
    0 0 0 4px rgba(100, 108, 255, 0.28),
    0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 1;
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

/* Loading spinner */
.button__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid transparent;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
