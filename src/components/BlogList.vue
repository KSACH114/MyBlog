<template>
  <main class="content-layer">
    <div class="spacer-10vh"></div>

    <div class="blog-container">
      <section class="intro-text">
        <h2>{{ introTitle }}</h2>
        <p v-html="introContent"></p>
      </section>

      <div class="grid-layout">
        <article 
          class="card" 
          v-for="(article, index) in articles" 
          :key="article.id || index"
          @click="handleCardClick(article)"
        >
          <div class="card-cover" :style="getCoverStyle(article)"></div>
          <div class="card-info">
            <span class="tag">{{ article.tag }}</span>
            <h3>{{ article.title }}</h3>
            <p>{{ article.summary }}</p>
            <div class="card-meta">
              <span class="date">{{ article.date }}</span>
              <span class="read-time" v-if="article.readTime">{{ article.readTime }}</span>
            </div>
          </div>
        </article>
      </div>
      
      <footer class="footer">
        <p>{{ footerText }}</p>
      </footer>
    </div>
  </main>
</template>

<script setup>
const props = defineProps({
  introTitle: {
    type: String,
    default: 'Designing the Future.'
  },
  introContent: {
    type: String,
    default: '这里是 <strong>KSACH</strong> 的数字花园。就像苹果的发布会一样，这里的每一个像素都经过精心打磨。向下滚动，体验从宏观视觉到微观阅读的丝滑过渡。'
  },
  articles: {
    type: Array,
    default: () => [
      { id: 1, tag: 'Engineering', title: 'The Art of Over-Engineering 1', summary: 'Why simple is boring and complex is fun.', date: '2026-01-15', readTime: '5 min read' },
      { id: 2, tag: 'Design', title: 'The Art of Over-Engineering 2', summary: 'Why simple is boring and complex is fun.', date: '2026-01-10', readTime: '3 min read' },
      { id: 3, tag: 'Technology', title: 'The Art of Over-Engineering 3', summary: 'Why simple is boring and complex is fun.', date: '2026-01-05', readTime: '7 min read' },
      { id: 4, tag: 'Engineering', title: 'The Art of Over-Engineering 4', summary: 'Why simple is boring and complex is fun.', date: '2025-12-28', readTime: '4 min read' },
      { id: 5, tag: 'Design', title: 'The Art of Over-Engineering 5', summary: 'Why simple is boring and complex is fun.', date: '2025-12-20', readTime: '6 min read' },
      { id: 6, tag: 'Technology', title: 'The Art of Over-Engineering 6', summary: 'Why simple is boring and complex is fun.', date: '2025-12-15', readTime: '8 min read' }
    ]
  },
  footerText: {
    type: String,
    default: '© 2026 Ksach. All rights reserved.'
  }
})

const emit = defineEmits(['card-click'])

const handleCardClick = (article) => {
  emit('card-click', article)
}

const getCoverStyle = (article) => {
  if (article.coverImage) {
    return {
      backgroundImage: `url(${article.coverImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  return {}
}
</script>

<style scoped>
.content-layer {
  position: relative;
  z-index: 10;
}

.spacer-10vh {
  height: 10vh;
  pointer-events: none;
}

.blog-container {
  background: #0a0a0a;
  min-height: 100vh;
  padding: 80px 24px;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -20px 40px rgba(0,0,0,0.5);
  max-width: 1200px;
  margin: 0 auto;
}

.intro-text {
  max-width: 600px;
  margin: 0 auto 80px;
  text-align: center;
}

.intro-text h2 {
  font-size: 3rem;
  margin-bottom: 24px;
  background: linear-gradient(to right, #fff, #888);
  -webkit-background-clip: text;
  color: transparent;
}

.intro-text p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #888;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding-bottom: 100px;
}

.card {
  background: #111;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #222;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  border-color: #333;
}

.card-cover {
  height: 200px;
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
}

.card-info {
  padding: 24px;
}

.tag {
  color: #3b82f6;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.card-info h3 {
  margin: 8px 0;
  font-size: 1.2rem;
  color: #eee;
}

.card-info p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #555;
}

.footer {
  text-align: center;
  color: #444;
  padding: 40px 0;
}
</style>
