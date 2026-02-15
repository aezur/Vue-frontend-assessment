<template>
  <Pill :variant="statusVariant">
    {{ statusText }}
  </Pill>
</template>

<script setup>
import { computed } from "vue";
import Pill from "@/components/core/PillBox.vue";

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) =>
      ["active", "paused", "completed", "draft"].includes(value),
  },
});

const statusVariant = computed(() => {
  switch (props.status) {
    case "active":
      return "success";
    case "paused":
      return "warning";
    case "completed":
      return "info";
    case "draft":
    default:
      return "default";
  }
});

const statusText = computed(() => {
  return props.status.charAt(0).toUpperCase() + props.status.slice(1);
});
</script>
