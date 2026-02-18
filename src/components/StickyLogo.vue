<template>
  <div class="logo" :style="logoStyle">
    {{ text }}
  </div>
</template>

<script setup>
import { inject, computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: { type: String, default: 'KSACH' },
  initialSize: { type: Number, default: 5 },
  finalSize: { type: Number, default: 1.5 },
  anchorRef: { type: Object, default: null }
})

const progress = inject('progress')

const solveCubicBezier = (t, x1, y1, x2, y2) => {
  const cx = 3.0 * x1
  const bx = 3.0 * (x2 - x1) - cx
  const ax = 1.0 - cx - bx
  const cy = 3.0 * y1
  const by = 3.0 * (y2 - y1) - cy
  const ay = 1.0 - cy - by

  const sampleCurveX = (t) => ((ax * t + bx) * t + cx) * t
  const sampleCurveY = (t) => ((ay * t + by) * t + cy) * t
  const sampleCurveDerivativeX = (t) => (3.0 * ax * t + 2.0 * bx) * t + cx

  let x = t, t2, i
  for (i = 0; i < 8; i++) {
    t2 = sampleCurveX(x) - t
    if (Math.abs(t2) < 1e-7) return sampleCurveY(x)
    let d2 = sampleCurveDerivativeX(x)
    if (Math.abs(d2) < 1e-7) break
    x = x - t2 / d2
  }
  return sampleCurveY(x)
}

const endPos = ref({ x: 30, y: 17 })

const updateEndPos = () => {
  if (props.anchorRef?.value) {
    const rect = props.anchorRef.value.getBoundingClientRect()
    endPos.value = { x: rect.left, y: rect.top + rect.height / 2 }
  }
}

onMounted(() => {
  updateEndPos()
  window.addEventListener('resize', updateEndPos)
})

onUnmounted(() => window.removeEventListener('resize', updateEndPos))

const logoStyle = computed(() => {
  const p = solveCubicBezier(progress.value, 0.6, 0, 0.4, 1.01)
  
  const startX = window.innerWidth / 2
  const startY = window.innerHeight / 2
  
  const currentX = startX + (endPos.value.x - startX) * p
  const currentY = startY + (endPos.value.y - startY) * p
  
  const offsetX = -50 * (1 - p)
  const offsetY = -50 * (1 - p)
  
  const currentSize = props.initialSize - (props.initialSize - props.finalSize) * p

  return {
    fontSize: `${currentSize}rem`,
    transform: `translate3d(${currentX}px, ${currentY}px, 0) translate(${offsetX}%, ${offsetY}%)`,
    left: 0,
    top: 0
  }
})
</script>

<style scoped>
.logo {
  position: fixed;
  z-index: 100;
  font-weight: 900;
  letter-spacing: -0.05em;
  white-space: nowrap;
  pointer-events: none;
  color: transparent;
  
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
  
  transition: none;
  will-change: transform, font-size;
  
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
  animation: shine 8s cubic-bezier(0.4, 0, 0.5, 1) infinite;
}

@keyframes shine {
 0% { background-position: 0% center; }
 100% { background-position: 200% center; }
}
</style>
