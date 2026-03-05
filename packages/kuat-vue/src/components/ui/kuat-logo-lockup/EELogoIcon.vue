<script setup lang="ts">
/**
 * Equal Experts logo icon (bracket mark only, no wordmark).
 * Used in dark Service logo lockup.
 */
interface Props {
  class?: string
}

defineOptions({ name: "EELogoIcon" })
const props = defineProps<Props>()
</script>

<template>
  <svg
    :class="['ee-logo-icon', props.class]"
    viewBox="0 0 143 133"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Equal Experts"
  >
    <path
      d="M102.74 38.8927H40.5969V57.5323H102.74V38.8927Z"
      fill="currentColor"
    />
    <path
      d="M102.74 75.3895H40.5969V93.029H102.74V75.3895Z"
      fill="currentColor"
    />
    <path
      d="M0.489227 2.44485V20.7938V110.382V128.741H19.1389H56.6732V110.382H19.1389V20.7938H56.6732V2.44485H19.1389H0.489227Z"
      fill="currentColor"
    />
    <path
      d="M124.198 2.44485H85.6262V21.0844H124.198V112.092H85.6262V130.741H124.198H142.847V112.092V21.0844V2.44485H124.198Z"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped>
@reference "../../../styles.css";

.ee-logo-icon {
  @apply text-primary;
}
</style>
