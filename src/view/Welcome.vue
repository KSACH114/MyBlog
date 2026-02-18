<template>
  <div class="welcome-container">
    <!-- 背景图片 -->
    <div class="background-image" :style="{ transform: `scale(${scaleFactor})` }"></div>
    
    <!-- 遮罩层 -->
    <div class="overlay-mask" :style="{ opacity: maskOpacity }"></div>
    
    <!-- 主要内容 -->
    <div class="content">
      <h1 :class="{ 'fade-out': isScrolled }">KSACH</h1>
      <div class="hint" :class="{ 'fade-out': isScrolled }">
        Scroll down to explore
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const scrollTop = ref(0)
const maskOpacity = ref(0)
const scaleFactor = ref(1)
const isScrolled = ref(false)

// 参数配置
const MAX_SCROLL_FOR_MASK = 380      // 滚动380px时遮罩达到最深
const MAX_MASK_OPACITY = 0.8         // 最大不透明度
const MAX_SCROLL_FOR_SCALE = 100     // 滚动500px达到最大缩放
const MAX_SCALE = 1.2                // 最大放大倍数
const MIN_SCALE = 1.0

// 更新效果函数
const updateEffects = () => {
  // 计算遮罩不透明度
  let rawOpacity = scrollTop.value / MAX_SCROLL_FOR_MASK
  maskOpacity.value = Math.min(rawOpacity, MAX_MASK_OPACITY)
  
  // 计算缩放因子
  let factor = 1 + (scrollTop.value / MAX_SCROLL_FOR_SCALE) * (MAX_SCALE - MIN_SCALE)
  scaleFactor.value = Math.min(factor, MAX_SCALE)
  
  // 判断是否滚动超过60px
  isScrolled.value = scrollTop.value > 60
}

// 滚动事件处理
const handleScroll = () => {
  scrollTop.value = window.scrollY
  updateEffects()
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化效果
  updateEffects()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.welcome-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/wallpaper.jpg'); /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  transition: transform 0.1s ease-out;
  z-index: 1;
}

.overlay-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.1s ease-out;
  z-index: 2;
}

.content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
}

h1 {
  font-size: 4rem;
  margin: 0 0 1rem 0;
  transition: opacity 0.3s ease-out;
}

.hint {
  font-size: 1.2rem;
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-out {
  opacity: 0 !important;
}
</style>