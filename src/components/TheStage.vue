<template>
  <div class="stage">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide, readonly, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)
const progress = ref(0)
const isStuck = ref(false)

provide('scrollY', readonly(scrollY))
provide('progress', readonly(progress))
provide('isStuck', readonly(isStuck))

const getSyncDistance = () => window.innerHeight

const updateProgress = () => {
  const scrollTop = window.scrollY
  scrollY.value = scrollTop
  
  const syncDistance = getSyncDistance()
  let p = scrollTop / syncDistance
  progress.value = Math.min(Math.max(p, 0), 1)
  
  isStuck.value = scrollTop >= window.innerHeight
}

const onScroll = () => {
  requestAnimationFrame(updateProgress)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

defineExpose({
  scrollY,
  progress,
  isStuck
})
</script>

<style scoped>
.stage {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  background-color: #000;
  color: #fff;
}
</style>
