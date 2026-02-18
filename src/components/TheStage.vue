<template>
  <div class="scaffold" ref="containerRef" @scroll="onScroll">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide, readonly } from 'vue'

const containerRef = ref(null)
const scrollY = ref(0)
const progress = ref(0)
const isStuck = ref(false)

provide('scrollY', readonly(scrollY))
provide('progress', readonly(progress))
provide('isStuck', readonly(isStuck))

const getSyncDistance = () => window.innerHeight

const updateProgress = () => {
  const container = containerRef.value
  if (!container) return
  
  const scrollTop = container.scrollTop
  scrollY.value = scrollTop
  
  const syncDistance = getSyncDistance()
  let p = scrollTop / syncDistance
  progress.value = Math.min(Math.max(p, 0), 1)
  
  isStuck.value = scrollTop >= window.innerHeight
}

const onScroll = () => {
  requestAnimationFrame(updateProgress)
}

defineExpose({
  scrollY,
  progress,
  isStuck
})
</script>

<style scoped>
.scaffold {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background-color: #000;
  color: #fff;
  scroll-behavior: smooth;
}

.scaffold::-webkit-scrollbar {
  display: none;
}
.scaffold {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
