<template>
  <nav class="pagination" v-if="pagination">
    <div class="pagination__col"></div>
    <div class="pagination__col pagination__center">
      <Button size="sm" variant="primary" :disabled="pagination.page === 1" @click="changePage(pagination.page - 1)"
        aria-label="Previous page">
        &#8592; Prev
      </Button>
      <span class="pagination__info">
        Page {{ pagination.page }} of {{ pagination.totalPages }}
      </span>
      <Button size="sm" variant="primary" :disabled="pagination.page === pagination.totalPages"
        @click="changePage(pagination.page + 1)" aria-label="Next page">
        Next &#8594;
      </Button>
    </div>
    <div class="pagination__col pagination__right">
      <label class="pagination__limit-label">
        Show
        <select v-model.number="selectedLimit" @change="onLimitChange" class="pagination__select">
          <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
        </select>
        per page
      </label>
    </div>
  </nav>
</template>

<script setup>
import Button from './BaseButton.vue';

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 25, 50],
  },
});
const emit = defineEmits(['page', 'limit']);

import { ref, watch } from 'vue';
const selectedLimit = ref(props.pagination.limit);

watch(
  () => props.pagination.limit,
  (newLimit) => {
    selectedLimit.value = newLimit;
  }
);

function changePage(newPage) {
  if (
    newPage >= 1 &&
    newPage <= props.pagination.totalPages &&
    newPage !== props.pagination.page
  ) {
    emit('page', newPage);
  }
}

function onLimitChange() {
  emit('limit', selectedLimit.value);
}
</script>

<style scoped>
.pagination {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin: 2rem 0 1.5rem 0;
  padding: 1rem;
}

.pagination__col {
  min-width: 0;
}

.pagination__center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.pagination__info {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  background: var(--color-bg);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.pagination__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pagination__limit-label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination__select {
  margin: 0 0.2rem;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.pagination__select:focus {
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}

.pagination__select:hover {
  border-color: var(--color-primary-accent);
}

@media (max-width: 600px) {
  .pagination {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem 0.5rem;
  }

  .pagination__center,
  .pagination__right {
    justify-content: center;
  }

  .pagination__info {
    order: -1;
  }
}
</style>