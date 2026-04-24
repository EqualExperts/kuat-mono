<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { cn } from "@/lib/utils"
import type { CarouselItemBasis } from "./context"
import { carouselContextKey } from "./context"

interface Props {
  class?: HTMLAttributes["class"]
  basis?: CarouselItemBasis
  basisSm?: CarouselItemBasis
  basisMd?: CarouselItemBasis
  basisLg?: CarouselItemBasis
  basisXl?: CarouselItemBasis
  basis2xl?: CarouselItemBasis
}

const props = defineProps<Props>()
const carousel = inject(carouselContextKey)

const resolvedBasis = computed(() => props.basis ?? carousel?.basis.value ?? 1)
const resolvedSm = computed(() => props.basisSm ?? carousel?.responsiveBasis.value.sm)
const resolvedMd = computed(() => props.basisMd ?? carousel?.responsiveBasis.value.md)
const resolvedLg = computed(() => props.basisLg ?? carousel?.responsiveBasis.value.lg)
const resolvedXl = computed(() => props.basisXl ?? carousel?.responsiveBasis.value.xl)
const resolved2xl = computed(() => props.basis2xl ?? carousel?.responsiveBasis.value["2xl"])

const itemClass = computed(() =>
  cn(
    "carousel__item",
    `carousel__item--${carousel?.orientation.value ?? "horizontal"}`,
    `carousel__item--basis-${resolvedBasis.value}`,
    resolvedSm.value != null && `carousel__item--basis-sm-${resolvedSm.value}`,
    resolvedMd.value != null && `carousel__item--basis-md-${resolvedMd.value}`,
    resolvedLg.value != null && `carousel__item--basis-lg-${resolvedLg.value}`,
    resolvedXl.value != null && `carousel__item--basis-xl-${resolvedXl.value}`,
    resolved2xl.value != null && `carousel__item--basis-2xl-${resolved2xl.value}`,
    props.class
  )
)
</script>

<template>
  <div :class="itemClass">
    <slot />
  </div>
</template>
