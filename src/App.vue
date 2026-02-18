<template>
  <TheStage>
    <StickyLogo text="KSACH" :anchor-ref="topBarRef?.anchorRef" />
    <Hero />
    
    <main class="content">
      <div class="spacer"></div>
      <TopBar ref="topBarRef" />
      <BlogList 
        :articles="articles"
        @card-click="handleCardClick"
      />
    </main>
  </TheStage>
</template>

<script setup>
import { ref } from 'vue'
import TheStage from './components/TheStage.vue'
import StickyLogo from './components/StickyLogo.vue'
import TopBar from './components/TopBar.vue'
import Hero from './components/Hero.vue'
import BlogList from './components/BlogList.vue'

const topBarRef = ref(null)

const articles = ref([
  { 
    id: 1, 
    tag: 'Engineering', 
    title: 'The Art of Over-Engineering 1', 
    summary: 'Why simple is boring and complex is fun.', 
    date: '2026-01-15', 
    readTime: '5 min read' 
  },
  { 
    id: 2, 
    tag: 'Design', 
    title: 'The Art of Over-Engineering 2', 
    summary: 'Why simple is boring and complex is fun.', 
    date: '2026-01-10', 
    readTime: '3 min read' 
  },
  { 
    id: 3, 
    tag: 'Technology', 
    title: 'The Art of Over-Engineering 3', 
    summary: 'Why simple is boring and complex is fun.', 
    date: '2026-01-05', 
    readTime: '7 min read' 
  },
  { 
    id: 4, 
    tag: 'Engineering', 
    title: 'The Art of Over-Engineering 4', 
    summary: 'Why simple is boring and complex is fun.', 
    date: '2025-12-28', 
    readTime: '4 min read' 
  },
  { 
    id: 5, 
    tag: 'Design', 
    title: 'The Art of Over-Engineering 5', 
    summary: 'Why simple is boring and complex is fun.', 
    date: '2025-12-20', 
    readTime: '6 min read' 
  },
  { 
    id: 6, 
    tag: 'Technology', 
    title: 'The Art of Over-Engineering 6', 
    summary: 'Why simple is boring and complex is fun.', 
    date: '2025-12-15', 
    readTime: '8 min read' 
  }
])

const handleCardClick = (article) => {
  console.log('Article clicked:', article)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

.content {
  position: relative;
  z-index: 10;
}

.spacer {
  height: 100vh;
  pointer-events: none;
}
</style>
