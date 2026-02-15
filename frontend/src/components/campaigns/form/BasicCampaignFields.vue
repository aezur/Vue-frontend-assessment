<template>
  <div
    v-for="row in formRows"
    :key="row.map((f) => f.name).join('-')"
    class="form-row"
  >
    <div v-for="field in row" :key="field.name" class="form-group">
      <label>{{ field.label }}</label>
      <Field
        v-if="field.type === 'select'"
        :name="field.name"
        as="select"
        :disabled="disabled"
      >
        <option v-for="option in field.options" :key="option" :value="option">
          {{ option.charAt(0).toUpperCase() + option.slice(1) }}
        </option>
      </Field>
      <Field
        v-else-if="field.type === 'number'"
        :name="field.name"
        type="number"
        :min="field.min"
        :step="field.step"
        :disabled="disabled"
      />
      <Field
        v-else-if="field.type === 'date'"
        :name="field.name"
        type="date"
        :disabled="disabled"
      />
      <Field v-else :name="field.name" type="text" :disabled="disabled" />
      <ErrorMessage :name="field.name" class="error-message" />
    </div>
  </div>
  <!-- Single-column fields -->
  <div v-for="field in singleFields" :key="field.name" class="form-group">
    <label>{{ field.label }}</label>
    <Field :name="field.name" :as="field.type" :disabled="disabled" />
    <ErrorMessage :name="field.name" class="error-message" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { computed } from "vue";
import {
  CREATE_FORM_ROWS,
  EDIT_FORM_ROWS,
  CREATE_SINGLE_FIELDS,
  EDIT_SINGLE_FIELDS,
} from "@/constants/formFields";

const props = defineProps({
  disabled: { type: Boolean, default: false },
  mode: { type: String, default: "create" },
});

const formRows = computed(() => {
  return props.mode === "create" ? CREATE_FORM_ROWS : EDIT_FORM_ROWS;
});

const singleFields = computed(() => {
  return props.mode === "create" ? CREATE_SINGLE_FIELDS : EDIT_SINGLE_FIELDS;
});
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
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
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
