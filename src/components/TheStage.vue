<template>
  <div class="stage-container" ref="containerRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted, readonly } from 'vue'

const ANIMATION_DISTANCE = 500

const containerRef = ref(null)
const scrollY = ref(0)
const progress = ref(0)

provide('scrollY', readonly(scrollY))
provide('progress', readonly(progress))

const onScroll = () => {
  if (!containerRef.value) return
  const y = containerRef.value.scrollTop
  scrollY.value = y
  
  let p = y / ANIMATION_DISTANCE
  if (p < 0) p = 0
  if (p > 1) p = 1
  progress.value = p
}

onMounted(() => {
  const el = containerRef.value
  if (el) {
    el.addEventListener('scroll', onScroll, { passive: true })
  }
})

onUnmounted(() => {
  const el = containerRef.value
  if (el) {
    el.removeEventListener('scroll', onScroll)
  }
})

defineExpose({
  scrollY,
  progress
})
</script>

<style scoped>
.stage-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background-color: #000;
  color: #fff;
  scroll-behavior: smooth;
}

.stage-container::-webkit-scrollbar {
  display: none;
}
.stage-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
