<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { TagColor, TagMode } from "./constants"
import { Check, X } from "lucide-vue-next"
import { computed, inject } from "vue"
import { cn } from "@/lib/utils"
import { TAG_GROUP_INJECTION_KEY } from "@/components/ui/tag-group/constants"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    color?: TagColor
    /** One interaction model per group: display (non-interactive), toggle (multi-select filter), or dismiss (removable). Do not mix toggle and dismiss tags within the same group. */
    mode?: TagMode
    /** Toggle mode only: whether the tag is selected. */
    selected?: boolean
    disabled?: boolean
  }>(),
  {
    color: "base",
    mode: "display",
    selected: false,
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: "update:selected", selected: boolean): void
  (e: "dismiss"): void
}>()

const group = inject(TAG_GROUP_INJECTION_KEY, null)

const interactive = computed(() => props.mode !== "display")
const selectedVisual = computed(
  () => props.mode === "dismiss" || (props.mode === "toggle" && props.selected)
)

const classes = computed(() =>
  cn(
    "tag",
    `tag--${props.color}`,
    interactive.value && "tag--interactive",
    selectedVisual.value && "tag--selected",
    props.class
  )
)

function handleClick(event: MouseEvent) {
  if (props.mode === "toggle") {
    emit("update:selected", !props.selected)
  } else if (props.mode === "dismiss") {
    const label = (event.currentTarget as HTMLElement).textContent?.trim()
    if (label) group?.announce(`${label} removed`)
    emit("dismiss")
  }
}
</script>

<template>
  <button
    v-if="interactive"
    type="button"
    data-slot="tag"
    :data-color="props.color"
    :data-mode="props.mode"
    :aria-pressed="props.mode === 'toggle' ? props.selected : undefined"
    :disabled="props.disabled"
    :class="classes"
    @click="handleClick"
  >
    <slot />
    <Check
      v-if="props.mode === 'toggle' && props.selected"
      aria-hidden="true"
      class="tag__icon"
      data-slot="tag-icon"
    />
    <X
      v-if="props.mode === 'dismiss'"
      aria-hidden="true"
      class="tag__icon"
      data-slot="tag-icon"
    />
  </button>
  <span
    v-else
    data-slot="tag"
    :data-color="props.color"
    :data-mode="props.mode"
    :class="classes"
  >
    <slot />
  </span>
</template>

<style scoped>
@reference "../../../styles.css";

/* Tag – colours come from the per-category --tag-* semantic tokens (mirroring the Figma
   "semantic colors" collection), which carry their own light/dark values — no raw ramp
   references here. A transparent border is always present so the hover border doesn't
   shift layout. */

.tag {
  @apply relative inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-2 text-sm font-medium leading-[21px];
  background-color: var(--kuat-tag-background);
  color: var(--kuat-tag-foreground);
}

.tag__icon {
  @apply size-3.5 shrink-0;
}

/* Interactive tags: pointer, focus ring, and a 44px-tall invisible hit area (WCAG touch
   target) extending beyond the 37px visual pill. */
.tag--interactive {
  @apply cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;
}

.tag--interactive::before {
  @apply absolute inset-x-0 top-1/2 h-11 -translate-y-1/2;
  content: "";
}

.tag--interactive:hover:not(.tag--selected):not(:disabled) {
  background-color: var(--kuat-tag-background-hover);
  border-color: var(--kuat-tag-border);
}

.tag--selected {
  background-color: var(--kuat-tag-background-selected);
}

.tag--interactive:disabled {
  @apply pointer-events-none opacity-50;
}

.tag--base {
  --kuat-tag-foreground: var(--tag-base-foreground);
  --kuat-tag-background: var(--tag-base-background);
  --kuat-tag-background-hover: var(--tag-base-background-hover);
  --kuat-tag-background-selected: var(--tag-base-background-selected);
  --kuat-tag-border: var(--tag-base-border);
}

.tag--index-indigo {
  --kuat-tag-foreground: var(--tag-index-indigo-foreground);
  --kuat-tag-background: var(--tag-index-indigo-background);
  --kuat-tag-background-hover: var(--tag-index-indigo-background-hover);
  --kuat-tag-background-selected: var(--tag-index-indigo-background-selected);
  --kuat-tag-border: var(--tag-index-indigo-border);
}

.tag--transform-teal {
  --kuat-tag-foreground: var(--tag-transform-teal-foreground);
  --kuat-tag-background: var(--tag-transform-teal-background);
  --kuat-tag-background-hover: var(--tag-transform-teal-background-hover);
  --kuat-tag-background-selected: var(--tag-transform-teal-background-selected);
  --kuat-tag-border: var(--tag-transform-teal-border);
}

.tag--packet-plum {
  --kuat-tag-foreground: var(--tag-packet-plum-foreground);
  --kuat-tag-background: var(--tag-packet-plum-background);
  --kuat-tag-background-hover: var(--tag-packet-plum-background-hover);
  --kuat-tag-background-selected: var(--tag-packet-plum-background-selected);
  --kuat-tag-border: var(--tag-packet-plum-border);
}

.tag--server-slate {
  --kuat-tag-foreground: var(--tag-server-slate-foreground);
  --kuat-tag-background: var(--tag-server-slate-background);
  --kuat-tag-background-hover: var(--tag-server-slate-background-hover);
  --kuat-tag-background-selected: var(--tag-server-slate-background-selected);
  --kuat-tag-border: var(--tag-server-slate-border);
}

.tag--logic-lime {
  --kuat-tag-foreground: var(--tag-logic-lime-foreground);
  --kuat-tag-background: var(--tag-logic-lime-background);
  --kuat-tag-background-hover: var(--tag-logic-lime-background-hover);
  --kuat-tag-background-selected: var(--tag-logic-lime-background-selected);
  --kuat-tag-border: var(--tag-logic-lime-border);
}

.tag--signal-yellow {
  --kuat-tag-foreground: var(--tag-signal-yellow-foreground);
  --kuat-tag-background: var(--tag-signal-yellow-background);
  --kuat-tag-background-hover: var(--tag-signal-yellow-background-hover);
  --kuat-tag-background-selected: var(--tag-signal-yellow-background-selected);
  --kuat-tag-border: var(--tag-signal-yellow-border);
}

.tag--cursor-coral {
  --kuat-tag-foreground: var(--tag-cursor-coral-foreground);
  --kuat-tag-background: var(--tag-cursor-coral-background);
  --kuat-tag-background-hover: var(--tag-cursor-coral-background-hover);
  --kuat-tag-background-selected: var(--tag-cursor-coral-background-selected);
  --kuat-tag-border: var(--tag-cursor-coral-border);
}

.tag--patch-peach {
  --kuat-tag-foreground: var(--tag-patch-peach-foreground);
  --kuat-tag-background: var(--tag-patch-peach-background);
  --kuat-tag-background-hover: var(--tag-patch-peach-background-hover);
  --kuat-tag-background-selected: var(--tag-patch-peach-background-selected);
  --kuat-tag-border: var(--tag-patch-peach-border);
}
</style>
