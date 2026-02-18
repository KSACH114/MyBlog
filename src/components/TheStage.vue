<template>
  <div class="scaffold" ref="containerRef" @scroll="onScroll">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide, readonly } from 'vue'

const ANIMATION_DISTANCE = 500

const containerRef = ref(null)
const scrollY = ref(0)
const progress = ref(0)
const isStuck = ref(false)

provide('scrollY', readonly(scrollY))
provide('progress', readonly(progress))
provide('isStuck', readonly(isStuck))

const onScroll = (e) => {
  const y = e.target.scrollTop
  scrollY.value = y
  
  let p = y / ANIMATION_DISTANCE
  if (p < 0) p = 0
  if (p > 1) p = 1
  progress.value = p
  
  isStuck.value = y >= window.innerHeight
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
