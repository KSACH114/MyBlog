<template>
  <div class="magic-logo" :style="logoStyle">
    {{ text }}
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'KSACH'
  },
  initialFontSize: {
    type: String,
    default: '5rem'
  },
  finalFontSize: {
    type: String,
    default: '1.5rem'
  },
  initialLeft: {
    type: String,
    default: '50%'
  },
  finalLeft: {
    type: String,
    default: '24px'
  },
  initialTop: {
    type: String,
    default: '50%'
  },
  finalTop: {
    type: String,
    default: '22px'
  }
})

const progress = inject('progress')

const logoStyle = computed(() => {
  return {
    '--p': progress.value,
    '--initial-font-size': props.initialFontSize,
    '--final-font-size': props.finalFontSize,
    '--font-diff': `calc(${props.initialFontSize} - ${props.finalFontSize})`,
    '--initial-left': props.initialLeft,
    '--final-left': props.finalLeft,
    '--initial-top': props.initialTop,
    '--final-top': props.finalTop
  }
})
</script>

<style scoped>
.magic-logo {
  position: fixed;
  z-index: 100;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #fff;
  
  font-size: calc(var(--initial-font-size) - (var(--font-diff) * var(--p)));
  
  left: calc(var(--initial-left) - ((calc(var(--initial-left) - var(--final-left)) * var(--p))));
  top: calc(var(--initial-top) - ((calc(var(--initial-top) - var(--final-top)) * var(--p))));
  
  transform: translate(calc(-50% * (1 - var(--p))), calc(-50% * (1 - var(--p))));
  
  pointer-events: none;
  white-space: nowrap;
  will-change: top, left, font-size, transform;
}
</style>
