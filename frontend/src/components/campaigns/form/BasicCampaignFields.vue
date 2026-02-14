<template>
  <div v-for="row in formRows" :key="row.map(f => f.name).join('-')" class="form-row">
    <!-- 2-col fields -->
    <div v-for="field in row" :key="field.name" class="form-group">
      <label>{{ field.label }}</label>
      <Field v-if="field.type === 'select'" :name="field.name" as="select">
        <option v-for="option in field.options" :key="option" :value="option">{{
          option.charAt(0).toUpperCase() + option.slice(1) }}</option>
      </Field>
      <Field v-else-if="field.type === 'number'" :name="field.name" type="number" :min="field.min" :step="field.step" />
      <Field v-else-if="field.type === 'date'" :name="field.name" type="date" />
      <Field v-else :name="field.name" type="text" />
      <ErrorMessage :name="field.name" class="error-message" />
    </div>
  </div>
  <!-- Single-column fields -->
  <div v-for="field in singleFields" :key="field.name" class="form-group">
    <label>{{ field.label }}</label>
    <Field :name="field.name" :as="field.type" />
    <ErrorMessage :name="field.name" class="error-message" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const formRows = [
  [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', options: ['draft', 'active', 'paused', 'completed'] },
  ],
  [
    { name: 'budget', label: 'Budget', type: 'number', min: 0, step: 0.01 },
    { name: 'spent', label: 'Spent', type: 'number', min: 0, step: 0.01 },
  ],
  [
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
  ],
]

const singleFields = [
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'targetAudience', label: 'Target Audience', type: 'textarea' },
]
</script>

<style scoped>
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-text);
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.error-message {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>