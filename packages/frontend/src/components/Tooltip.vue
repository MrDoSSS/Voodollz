<script setup lang="ts">
import { Tooltip } from 'bootstrap'
import { onMounted, ref, onBeforeUnmount } from 'vue'

type Placement = 'auto' | 'top' | 'bottom' | 'left' | 'right' | (() => void)

const props = defineProps({
  target: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    default: 'default',
  },
  placement: {
    type: String,
    default: 'right',
  },
  offset: {
    type: Array,
    default: () => [],
  },
})
const root = ref<HTMLElement>()
const tooltip = ref<Tooltip>()

onMounted(() => {
  if (root.value) {
    tooltip.value = new Tooltip(props.target, {
      placement: props.placement as Placement,
      title: root.value.innerHTML,
      trigger: 'hover',
      html: true,
      template: `
        <div class="tooltip tooltip-${props.theme}" role="tooltip">
          <div class="tooltip-inner"></div>
        </div>
      `,
      offset: props.offset as [number, number],
    })
  }
})

onBeforeUnmount(() => tooltip.value?.dispose())
</script>

<template>
  <div ref="root" class="d-none" v-if="!tooltip">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.tooltip {
  &.show {
    opacity: 1 !important;
  }
}
</style>
