<script setup>
import { computed, onMounted } from 'vue';

// Props
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

// Debug: see real API data
onMounted(() => {
  console.log('POST DATA:', props.post);
});

// Date formatting
const formattedDate = computed(() => {
  if (!props.post.publishedAt) return 'No date';

  const date = new Date(props.post.publishedAt);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Read time
const readTime = computed(() => {
  if (!props.post.content) return '5 min read';

  const wordsPerMinute = 200;
  const wordCount = props.post.content.split(/\s+/).length;

  return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
});

// Excerpt
const excerpt = computed(() => {
  if (props.post.excerpt) return props.post.excerpt;

  if (props.post.content) {
    return props.post.content.substring(0, 150) + '...';
  }

  return 'No excerpt available.';
});
</script>

<template>
  <article class="post-card">

    <!-- Content -->
    <div class="post-content">

      <!-- Category -->
      <div v-if="post.category" class="category-badge">
        {{ post.category }}
      </div>

      <!-- Title -->
      <h2 class="post-title">
        <router-link :to="`/post/${post.id}`" class="title-link">
          {{ post.title }}
        </router-link>
      </h2>

      <!-- Excerpt -->
      <p class="post-excerpt">
        {{ excerpt }}
      </p>

      <!-- Meta -->
      <div class="post-meta">

        <div class="meta-left">
          <span v-if="post.author" class="author">
            {{ post.author }}
          </span>

          <span class="separator">•</span>

          <span class="date">
            {{ formattedDate }}
          </span>

          <span class="separator">•</span>

          <span class="read-time">
            {{ readTime }}
          </span>
        </div>

        <router-link
          :to="`/post/${post.id}`"
          class="read-more"
        >
          Read more →
        </router-link>

      </div>
    </div>
  </article>
</template>

<style scoped>
.post-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border-color: #10b981;
}

.post-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-badge {
  background: #d1fae5;
  color: #065f46;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  width: fit-content;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.title-link {
  text-decoration: none;
  color: #111827;
}

.title-link:hover {
  color: #10b981;
}

.post-excerpt {
  color: #6b7280;
  font-size: 0.95rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
  padding-top: 0.75rem;
}

.meta-left {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.read-more {
  color: #10b981;
  font-weight: 600;
  text-decoration: none;
}

/* Dark Mode Styles for BlogPostCard */
.dark .post-card {
  background-color: #1f2937;
  border-color: #374151;
}

.dark .post-card:hover {
  border-color: #10b981;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.dark .post-image-placeholder {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

.dark .category-badge {
  background-color: #065f46;
  color: #d1fae5;
}

.dark .title-link {
  color: #f9fafb;
}

.dark .post-excerpt {
  color: #9ca3af;
}

.dark .post-meta {
  border-top-color: #374151;
}

.dark .author {
  color: #d1d5db;
}

.dark .separator {
  color: #4b5563;
}

.dark .date,
.dark .read-time {
  color: #6b7280;
}
</style>