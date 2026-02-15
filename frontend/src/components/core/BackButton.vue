<template>
  <button
    class="back-button"
    type="button"
    @click="handleClick"
    @keydown="onKeydown"
    @keyup="onKeyup"
    :aria-label="ariaLabel"
  >
    <slot>
      <PhArrowLeft :size="16" />
      <span>Back</span>
    </slot>
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";
import { PhArrowLeft } from "@phosphor-icons/vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  to: { type: [String, Object], required: false },
  ariaLabel: { type: String, default: "Go back" },
});
const emit = defineEmits(["click"]);

const router = useRouter();

function handleClick(event) {
  try {
    emit("click", event);
    if (props.to) {
      router.push(props.to);
    } else {
      router.back();
    }
  } catch (e) {
    console.error(e);
  }
}

function onKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleClick();
  }
}

function onKeyup(event) {
  if (event.key === " " || event.key === "Spacebar" || event.key === "Space") {
    event.preventDefault();
    handleClick();
  }
}
</script>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: large;
  font-weight: 500;
  padding: 4px 8px;
}

.back-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(100, 108, 255, 0.18);
  border-radius: 6px;
}
</style>