<template>
  <Form
    :key="props.mode"
    :validation-schema="validationSchema"
    :initial-values="props.initialValues"
    @submit="onSubmit"
  >
    <basic-campaign-fields :disabled="props.submitting" :mode="props.mode" />


    <Button
      type="submit"
      class="submit-button"
      :loading="props.submitting"
      :disabled="props.submitting"
    >
      {{ props.mode === "create" ? "Create" : "Update" }}
    </Button>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import {
  CreateCampaignSchema,
  UpdateCampaignSchema,
} from "@/validators/campaign";
import { computed } from "vue";
import BasicCampaignFields from "./BasicCampaignFields.vue";
import Button from "@/components/core/BaseButton.vue";

const props = defineProps({
  mode: { type: String, default: "create" },
  initialValues: { type: Object, required: true },
  submitting: { type: Boolean, default: false },
});

const emit = defineEmits(["submit"]);

const validationSchema = computed(() =>
  toTypedSchema(
    props.mode === "create" ? CreateCampaignSchema : UpdateCampaignSchema,
  ),
);

function onSubmit(values) {
  emit("submit", values);
}
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

button[type="submit"] {
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  margin: 1.5rem auto 0;
  display: block;
}

button[type="submit"]:hover {
  background-color: var(--color-primary-active);
}

button[type="submit"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}
</style>
