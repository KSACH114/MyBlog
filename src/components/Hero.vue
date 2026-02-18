<template>
  <div class="hero-layer" :style="heroStyle">
    <img 
      :src="imageSrc" 
      :alt="imageAlt" 
      class="hero-img"
    />
    <div class="hero-overlay" :style="{ opacity: overlayOpacity }"></div>
    
    <div class="scroll-hint" :style="{ opacity: scrollHintOpacity }">
      <p>{{ scrollText }}</p>
      <span class="arrow">↓</span>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  },
  imageAlt: {
    type: String,
    default: 'Hero Wallpaper'
  },
  scrollText: {
    type: String,
    default: 'Scroll to explore'
  }
})

const scrollY = inject('scrollY')
const progress = inject('progress')

const heroStyle = computed(() => {
  return {
    transform: `scale(${1 + scrollY.value * 0.0005})`,
    filter: `blur(${scrollY.value * 0.02}px)`
  }
})

const overlayOpacity = computed(() => {
  return Math.min(scrollY.value / 600, 0.8)
})

const scrollHintOpacity = computed(() => {
  return Math.max(0, 1 - progress.value * 3)
})
</script>

<style scoped>
.hero-layer {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s linear;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  pointer-events: none;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.arrow {
  display: block;
  margin-top: 8px;
  animation: float 2s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}
</style>
