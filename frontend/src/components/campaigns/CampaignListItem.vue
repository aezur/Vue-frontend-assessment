<template>
  <li
    class="campaign-list-item"
    @click="handleClick"
    @keydown="onKeydown"
    @keyup="onKeyup"
    tabindex="0"
    role="button"
    :aria-label="campaign.name"
  >
    <div class="campaign-details">
      <h3
        :style="{ viewTransitionName: `item-title-${campaign.id}` }"
        grid-area="name"
      >
        {{ campaign.name }}
      </h3>
      <p grid-area="budget">
        <PhCurrencyCircleDollar class="icon" size="22" />
        {{ formatCurrency(campaign.budget) }}
      </p>
      <p grid-area="dates">
        <PhCalendarBlank class="icon" size="22" />
        {{ formatDate(campaign.startDate) }} -
        {{ formatDate(campaign.endDate) }}
      </p>
      <CampaignStatusPill
        class="status-pill"
        grid-area="status"
        :status="campaign.status"
      />
    </div>
  </li>
</template>

<script setup>
import { formatCurrency, formatDate } from "@/utils/formatters";
import { toRefs } from "vue";
import CampaignStatusPill from "@/components/campaigns/CampaignStatusPill.vue";
import { PhCurrencyCircleDollar, PhCalendarBlank } from "@phosphor-icons/vue";

const props = defineProps({
  campaign: {
    type: Object,
    required: true,
  },
  onClick: {
    type: Function,
    required: false,
  },
});

const { campaign, onClick } = toRefs(props);

const emit = defineEmits(["click"]);

function handleClick(_event) {
  // prefer not to rely on the KeyboardEvent payload for parent handlers
  try {
    if (onClick.value && typeof onClick.value === "function") {
      onClick.value();
    }
    emit("click", campaign.value);
  } catch (e) {
    // swallow to avoid unhandled native handler errors
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
  // Space is usually activated on keyup for buttons - handle here to avoid double-activation
  if (event.key === " " || event.key === "Spacebar" || event.key === "Space") {
    event.preventDefault();
    handleClick();
  }
}
</script>

<style scoped>
.campaign-list-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  list-style: none;
  transition: border-color, background-color, box-shadow;
  transition-duration: 0.2s;
}

.campaign-list-item:hover {
  border-color: var(--color-primary-accent);
  background-color: var(--color-bg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.campaign-list-item:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(100, 108, 255, 0.18);
  border-color: var(--color-primary-accent);
}

.campaign-list-item:active {
  background-color: var(--color-bg-card);
  border-color: var(--color-primary-active);
}

.campaign-list-item h3 {
  margin: 0;
}

.campaign-list-item p {
  margin: 0;
}

.campaign-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas: "name budget dates status";
  gap: 1rem;
}

.status-pill {
  justify-self: end;
}

.icon {
  vertical-align: middle;
  color: var(--color-primary);
  margin-right: 8px;
}
</style>
