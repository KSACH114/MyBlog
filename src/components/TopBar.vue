<template>
  <header class="top-bar" :class="{ 'is-scrolled': scrollY > 50 }">
    <div class="logo-placeholder"></div> 
    
    <nav class="nav-links">
      <a href="#" v-for="link in navLinks" :key="link">{{ link }}</a>
    </nav>
    <div class="user-action">
      <button class="icon-btn">🔍</button>
    </div>
  </header>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  navLinks: {
    type: Array,
    default: () => ['Articles', 'Projects', 'About']
  },
  scrollThreshold: {
    type: Number,
    default: 50
  }
})

const scrollY = inject('scrollY')
</script>

<style scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 90;
  transition: background 0.3s ease, border-bottom 0.3s ease;
}

.top-bar.is-scrolled {
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-placeholder {
  width: 100px;
  height: 100%;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #fff;
}

.user-action {
  display: flex;
  align-items: center;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
