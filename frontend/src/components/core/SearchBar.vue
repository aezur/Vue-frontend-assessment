<template>
  <div class="search-bar">
    <input
      v-model="localValue"
      type="search"
      :placeholder="placeholder"
      class="search-bar__input"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Search items...",
  },
  debounce: {
    type: Number,
    default: 300,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);
let timeoutId = null;

watch(localValue, (newValue) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    emit("update:modelValue", newValue);
  }, props.debounce);
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== localValue.value) {
      localValue.value = newValue;
    }
  },
);
</script>

<style scoped>
.search-bar {
  width: 100%;
}

.search-bar__input {
  width: 100%;
  padding: 0.6em 1.2em;
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  font-size: 1em;
  font-family: inherit;
}

.search-bar__input:focus {
  outline: none;
  border-color: var(--color-primary-accent);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.search-bar__filters {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5em 1em;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.25s;
}

.filter-btn:hover {
  border-color: var(--color-primary);
  background-color: var(--color-bg-card);
}

.filter-btn.active {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
  color: #fff;
}

.filter-btn:focus {
  outline: 2px solid var(--color-primary-accent);
  outline-offset: 2px;
}
</style>
