<template>
  <div class="filters-container">
    <div class="search-bar__filters">
      <Button
        v-for="filter in filters"
        :key="filter.value"
        :class="['filter-btn', { active: selectedFilter === filter.value }]"
        variant="outline"
        size="sm"
        @click="selectFilter(filter.value)"
        :title="filter.label"
      >
        <component :is="filter.icon" :size="18" weight="duotone" />
        <Transition name="label">
          <span v-if="selectedFilter === filter.value" class="filter-label">{{
            filter.label
          }}</span>
        </Transition>
      </Button>
    </div>
    <div class="date-filters">
      <input
        id="startDate"
        type="date"
        v-model="localStartDate"
        class="date-input"
      />
      <input
        id="endDate"
        type="date"
        v-model="localEndDate"
        class="date-input"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  PhCircle,
  PhPause,
  PhCheck,
  PhNotePencil,
  PhFunnel,
} from "@phosphor-icons/vue";
import Button from "@/components/core/BaseButton.vue";

const props = defineProps({
  filterValue: {
    type: String,
    default: "",
  },
  startDate: {
    type: String,
    default: "",
  },
  endDate: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "update:filterValue",
  "update:startDate",
  "update:endDate",
]);

const selectedFilter = ref(props.filterValue);
const localStartDate = ref(props.startDate);
const localEndDate = ref(props.endDate);

const filters = [
  { value: "", label: "All", icon: PhFunnel },
  { value: "active", label: "Active", icon: PhCircle },
  { value: "paused", label: "Paused", icon: PhPause },
  { value: "completed", label: "Completed", icon: PhCheck },
  { value: "draft", label: "Draft", icon: PhNotePencil },
];

watch(
  () => props.filterValue,
  (newValue) => {
    if (newValue !== selectedFilter.value) {
      selectedFilter.value = newValue;
    }
  },
);

watch(
  () => props.startDate,
  (newValue) => {
    if (newValue !== localStartDate.value) {
      localStartDate.value = newValue;
    }
  },
);

watch(
  () => props.endDate,
  (newValue) => {
    if (newValue !== localEndDate.value) {
      localEndDate.value = newValue;
    }
  },
);

watch(localStartDate, (newValue) => {
  // Auto-swap if start date is after end date
  if (newValue && localEndDate.value && newValue > localEndDate.value) {
    const temp = localEndDate.value;
    localEndDate.value = newValue;
    emit("update:startDate", temp);
    emit("update:endDate", newValue);
  } else {
    emit("update:startDate", newValue);
  }
});

watch(localEndDate, (newValue) => {
  // Auto-swap if end date is before start date
  if (newValue && localStartDate.value && newValue < localStartDate.value) {
    const temp = localStartDate.value;
    localStartDate.value = newValue;
    emit("update:startDate", newValue);
    emit("update:endDate", temp);
  } else {
    emit("update:endDate", newValue);
  }
});

function selectFilter(value) {
  selectedFilter.value = value;
  emit("update:filterValue", value);
}
</script>

<style scoped>
.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-bar__filters {
  display: flex;
  gap: 0.5rem;
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
  overflow: hidden;
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

.filter-label {
  white-space: nowrap;
}

/* Transition for label */
.label-enter-active,
.label-leave-active {
  transition: all 0.25s ease;
}

.label-enter-from {
  opacity: 0;
  max-width: 0;
  transform: scaleX(0);
  transform-origin: left;
}

.label-enter-to {
  opacity: 1;
  max-width: 100px;
  transform: scaleX(1);
}

.label-leave-from {
  opacity: 1;
  max-width: 100px;
  transform: scaleX(1);
}

.label-leave-to {
  opacity: 0;
  max-width: 0;
  transform: scaleX(0);
  transform-origin: left;
}

.date-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.date-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date-input-group label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.date-input {
  padding: 0.5em 0.75em;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.9em;
  font-family: inherit;
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: border-color 0.25s;
}

.date-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
}

.date-input:hover {
  border-color: var(--color-primary-accent);
}
</style>
