<script setup>
import { ref, onMounted } from "vue";
import { getAllPosts } from "../api/posts.js";
import BlogPostCard from "../components/BlogPostCard.vue";
import PostCardSkeleton from "../components/PostCardSkeleton.vue";

// State variables
const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const postsPerPage = 12;

// Fetch posts with pagination
async function fetchPosts(page = 1) {
  try {
    loading.value = true;
    error.value = null;

    // Try to get from cache first (for instant load)
    const cacheKey = `blog-posts-page-${page}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const cached = JSON.parse(cachedData);
      posts.value = cached.posts;
      totalPages.value = cached.totalPages;
      currentPage.value = page;
      loading.value = false;
    }

    // Fetch fresh data from API
    const response = await getAllPosts(page, postsPerPage);
    const freshPosts = response.data || response;

    // Update state
    posts.value = freshPosts;
    currentPage.value = page;

    // Update pagination info
    if (response.meta) {
      totalPages.value = response.meta.totalPages || 1;
    }

    // Cache the data
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        posts: freshPosts,
        totalPages: totalPages.value,
        timestamp: Date.now(),
      })
    );

    loading.value = false;

    // Scroll to top smoothly when changing pages
    if (page > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (err) {
    error.value = err.message;
    loading.value = false;
    console.error("Error fetching posts:", err);
  }
}

// Navigate to next page
function nextPage() {
  if (currentPage.value < totalPages.value) {
    fetchPosts(currentPage.value + 1);
  }
}

// Navigate to previous page
function prevPage() {
  if (currentPage.value > 1) {
    fetchPosts(currentPage.value - 1);
  }
}

// Go to specific page
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    fetchPosts(page);
  }
}

// Show page numbers smartly
function shouldShowPage(page) {
  if (totalPages.value <= 7) return true;
  if (page === 1 || page === totalPages.value) return true;
  if (page >= currentPage.value - 1 && page <= currentPage.value + 1)
    return true;
  return false;
}

// Method to handle manual retry/reload
function handleRetry() {
  fetchPosts(currentPage.value);
}

onMounted(() => {
  fetchPosts(1);
});
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Explore Stories</h1>
        <p class="hero-subtitle">
          A curated collection of insights, guides, and fresh inspiration.
          Discover the latest trends, tips, and stories from our community of
          writers. Dive in and start exploring today!
        </p>
      </div>
    </section>

    <!-- Posts Section -->
    <section class="posts-section">
      <div class="container">
        <!-- Loading State with Skeletons -->
        <div v-if="loading" class="posts-grid">
          <PostCardSkeleton v-for="n in 6" :key="n" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <h2>Oops! Something went wrong</h2>
          <p>{{ error }}</p>
          <button @click="handleRetry" class="retry-button">Try Again</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="posts.length === 0" class="empty-state">
          <h2>No posts yet</h2>
          <p>Check back later for new content.</p>
        </div>

        <!-- Posts Grid -->
        <div v-else>
          <div class="posts-grid">
            <BlogPostCard
              v-for="(post, index) in posts"
              :key="post.id"
              :post="post"
              :style="{ animationDelay: `${index * 0.05}s` }"
              class="post-card-animate"
            />
          </div>

          <!-- Pagination Controls -->
          <div v-if="totalPages > 1" class="pagination">
            <!-- Previous Button -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="pagination-btn"
              :class="{ disabled: currentPage === 1 }"
            >
              <svg
                class="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <!-- Page Numbers -->
            <div class="page-numbers">
              <button
                v-for="page in totalPages"
                :key="page"
                v-show="shouldShowPage(page)"
                @click="goToPage(page)"
                class="page-number"
                :class="{ active: currentPage === page }"
              >
                {{ page }}
              </button>
            </div>

            <!-- Next Button -->
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="pagination-btn"
              :class="{ disabled: currentPage === totalPages }"
            >
              Next
              <svg
                class="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #f9fafb;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 4rem 1.5rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin: 0;
  opacity: 0.95;
}

/* Posts Section */
.posts-section {
  padding: 3rem 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Error & Empty */
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 1rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-button:hover {
  background-color: #059669;
}

/* Grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding: 2rem 0;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(.disabled) {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.pagination-btn.disabled {
  background-color: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.pagination-btn .icon {
  width: 18px;
  height: 18px;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.page-number:hover {
  border-color: #10b981;
  color: #10b981;
  background-color: #f0fdf4;
}

.page-number.active {
  background-color: #10b981;
  color: white;
  border-color: #10b981;
}

/* Dark Mode Styles */
.dark .home-page {
  background-color: #111827;
}

.dark .hero {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

.dark .error-state p,
.dark .empty-state p {
  color: #9ca3af;
}

.dark .error-state h2,
.dark .empty-state h2 {
  color: #f9fafb;
}

/* Dark mode pagination */
.dark .pagination-btn {
  background-color: #059669;
}

.dark .pagination-btn:hover:not(.disabled) {
  background-color: #047857;
}

.dark .pagination-btn.disabled {
  background-color: #374151;
  color: #6b7280;
}

.dark .page-number {
  background-color: #1f2937;
  color: #9ca3af;
  border-color: #374151;
}

.dark .page-number:hover {
  border-color: #10b981;
  color: #10b981;
  background-color: #065f46;
}

.dark .page-number.active {
  background-color: #10b981;
  color: white;
  border-color: #10b981;
}

/* Staggered animation */
.post-card-animate {
  animation: fadeIn 0.6s ease-out both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive pagination */
@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .pagination-btn {
    padding: 0.6rem 1rem;
    font-size: 0.875rem;
  }

  .page-number {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .posts-section {
    padding: 2rem 1rem;
  }
}
</style>