<template>
  <fieldset>
    <legend>Metrics</legend>
    <div v-for="row in metricsRows" :key="row.map(f => f.name).join('-')" class="form-row">
      <div v-for="field in row" :key="field.name" class="form-group">
        <label>{{ field.label }}</label>
        <Field :name="field.name" :type="field.type" :min="field.min" :step="field.step" />
        <ErrorMessage :name="field.name" class="error-message" />
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const metricsRows = [
  [
    { name: 'metrics.impressions', label: 'Impressions', type: 'number', min: 0 },
    { name: 'metrics.clicks', label: 'Clicks', type: 'number', min: 0 },
  ],
  [
    { name: 'metrics.conversions', label: 'Conversions', type: 'number', min: 0 },
    { name: 'metrics.ctr', label: 'CTR', type: 'number', min: 0, step: 0.01 },
  ],
  [
    { name: 'metrics.cpc', label: 'CPC', type: 'number', min: 0, step: 0.01 },
    { name: 'metrics.roas', label: 'ROAS', type: 'number', min: 0, step: 0.01 },
  ],
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

fieldset {
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

legend {
  font-weight: 600;
  color: var(--color-text);
  padding: 0 0.5rem;
}
</style>