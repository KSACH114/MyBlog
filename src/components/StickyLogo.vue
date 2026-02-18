<template>
  <div class="logo" :style="logoStyle">
    {{ text }}
  </div>
</template>

<script setup>
import { inject, computed, watch, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'KSACH'
  },
  initialSize: {
    type: Number,
    default: 5
  },
  finalSize: {
    type: Number,
    default: 1.5
  },
  anchorRef: {
    type: Object,
    default: null
  }
})

const progress = inject('progress')

const DEFAULT_ANCHOR = { left: 30, top: 17 }

const logoStyle = computed(() => {
  const p = progress.value
  
  const startX = window.innerWidth / 2
  const startY = window.innerHeight / 2
  
  let endX = DEFAULT_ANCHOR.left
  let endY = DEFAULT_ANCHOR.top
  
  if (props.anchorRef?.value) {
    const rect = props.anchorRef.value.getBoundingClientRect()
    endX = rect.left
    endY = rect.top + rect.height / 2
  }
  
  const currentX = startX + (endX - startX) * p
  const currentY = startY + (endY - startY) * p
  
  const tx = -50 * (1 - p)
  const ty = -50 * (1 - p)
  
  const currentSize = props.initialSize - (props.initialSize - props.finalSize) * p
  
  const isOverHalf = p > 0.8
  
  return {
    left: `${currentX}px`,
    top: `${currentY}px`,
    fontSize: `${currentSize}rem`,
    transform: `translate(${tx}%, ${ty}%)`,
    color: isOverHalf ? '#fff' : '#fff',
    '--glow-position': `${(1 - p) * 100}%`
  }
})
</script>

<style scoped>
.logo {
  position: fixed;
  z-index: 100;
  font-weight: 900;
  letter-spacing: -0.05em;
  background: linear-gradient(
    120deg,
    #fff 20%,
    #60a5fa 40%,
    #3b82f6 50%,
    #60a5fa 60%,
    #fff 80%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  pointer-events: none;
  white-space: nowrap;
  will-change: top, left, font-size, transform;
  /* transition: font-size 0.1s linear;                                                                                  */
  animation: shine 3s linear infinite;
}

@keyframes shine {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
