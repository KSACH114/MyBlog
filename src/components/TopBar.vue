<template>
  <nav class="topbar" :class="{ 'glass': isStuck }">
    <div class="logo-anchor" ref="anchorRef"></div>
    <div class="inner-nav">
      <div class="menu">
        <a href="#" v-for="link in navLinks" :key="link" class="nav-link">{{ link }}</a>
      </div>
      <button class="contact">{{ contactText }}</button>
    </div>
  </nav>
</template>

<script setup>
import { ref, inject, defineExpose } from 'vue'

const props = defineProps({
  navLinks: {
    type: Array,
    default: () => ['Essays', 'Works', 'Notes']
  },
  contactText: {
    type: String,
    default: 'Connect'
  }
})
3456
const isStuck = inject('isStuck')
const anchorRef = ref(null)

defineExpose({
  anchorRef
})
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 64px;
}

.glass {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-anchor {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;
  height: 30px;
  visibility: hidden;
  pointer-events: none;
}

.inner-nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #fff;
}

.contact {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}
</style>
