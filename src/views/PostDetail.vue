<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, getPostBySlug } from '../api/posts.js';

const route = useRoute();
const router = useRouter();

const post = ref(null);
const loading = ref(true);
const error = ref(null);

// Format date
function formatDate(dateString) {
  if (!dateString) return 'No date';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Read time
function calculateReadTime(content) {
  if (!content) return '5 min read';

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;

  return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
}

// Go back
function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
}

// Fetch post
onMounted(async () => {
  try {
    loading.value = true;

    if (route.params.id) {
      post.value = await getPostById(route.params.id);
    } else if (route.params.slug) {
      post.value = await getPostBySlug(route.params.slug);
    } else {
      throw new Error('No post identifier provided');
    }

    loading.value = false;
  } catch (err) {
    error.value = err.message;
    loading.value = false;

    if (err.message === 'Post not found') {
      setTimeout(() => router.push('/404'), 2000);
    }
  }
});
</script>

<template>
  <div class="post-detail-page">

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading post...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error-container">
      <h2>Post Not Found</h2>
      <p>{{ error }}</p>
    </div>

    <!-- Post -->
    <article v-else-if="post" class="post-article">

      <!-- Back -->
      <div class="back-button-container">
        <button @click="goBack" class="back-button">
          ← Back to Home
        </button>
      </div>

      <!-- Header -->
      <header class="post-header">

        <div v-if="post.category" class="category-badge">
          {{ post.category }}
        </div>

        <h1 class="post-title">{{ post.title }}</h1>

        <!-- Meta -->
        <div class="post-meta">
          <span v-if="post.author">{{ post.author }}</span>
          <span>•</span>
          <span>{{ formatDate(post.publishedAt) }}</span>
          <span>•</span>
          <span>{{ calculateReadTime(post.content) }}</span>
          <span>•</span>
          <span>{{ post.viewCount }} views</span>
        </div>

      </header>

      <!-- Content -->
      <div class="post-content">
        <div class="content-wrapper">
          {{ post.content }}
        </div>
      </div>

      <!-- Footer -->
      <footer class="post-footer">

        <div v-if="post.tags" class="tags">
          <span class="tags-label">Tags:</span>

          <span
            v-for="tag in post.tags.split(',')"
            :key="tag"
            class="tag"
          >
            {{ tag.trim() }}
          </span>
        </div>

        <button @click="goBack" class="back-button-footer">
          ← Back
        </button>

      </footer>

    </article>
  </div>
</template>

<style scoped>
.post-detail-page {
  min-height: 100vh;
  background: #f9fafb;
  padding: 2rem;
}

.post-article {
  max-width: 800px;
  margin: auto;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.post-header {
  padding: 1.5rem;
  
}

.category-badge {
  display: inline-block;
  background: #10b981;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.post-title {
  font-size: 2rem;
  font-weight: 800;
}

.post-meta {
  display: flex;
  gap: 10px;
  color: #6b7280;
  margin: 10px 0;
}

.post-content {
  padding: 1.5rem;
  line-height: 1.7;
}

.post-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.tag {
  background: #f3f4f6;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 5px;
}

.back-button,
.back-button-footer {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.loading-container {
  text-align: center;
  padding: 50px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top: 4px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Dark Mode Styles for PostDetail */
.dark .post-detail-page {
  background-color: #111827;
}

.dark .loading-container p {
  color: #9ca3af;
}

.dark .error-container h2 {
  color: #f9fafb;
}

.dark .error-container p {
  color: #9ca3af;
}

.dark .post-article {
  background-color: #1f2937;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.dark .category-badge {
  background-color: #065f46;
  color: #d1fae5;
}

.dark .post-title {
  color: #f9fafb;
}

.dark .post-meta {
  color: #9ca3af;
}

.dark .author {
  color: #d1d5db;
}

.dark .separator {
  color: #4b5563;
}

.dark .content-wrapper {
  color: #d1d5db;
}

.dark .post-footer {
  border-top-color: #374151;
}

.dark .tags-label {
  color: #9ca3af;
}

.dark .tag {
  background-color: #374151;
  color: #d1d5db;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>