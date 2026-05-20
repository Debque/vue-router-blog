<template>
  <div class="skeleton-card">
    <!-- Image skeleton -->
    <div class="skeleton skeleton-image"></div>
    
    <!-- Content skeleton -->
    <div class="skeleton-content">
      <!-- Badge skeleton -->
      <div class="skeleton skeleton-badge"></div>
      
      <!-- Title skeleton -->
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-title-short"></div>
      
      <!-- Excerpt skeleton -->
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text-short"></div>
      
      <!-- Meta skeleton -->
      <div class="skeleton-meta">
        <div class="skeleton skeleton-meta-item"></div>
        <div class="skeleton skeleton-meta-item"></div>
        <div class="skeleton skeleton-meta-item"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-image {
  width: 100%;
  height: 200px;
}

.skeleton-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-badge {
  width: 80px;
  height: 20px;
  border-radius: 9999px;
}

.skeleton-title {
  width: 100%;
  height: 24px;
  border-radius: 4px;
}

.skeleton-title-short {
  width: 60%;
  height: 24px;
  border-radius: 4px;
}

.skeleton-text {
  width: 100%;
  height: 16px;
  border-radius: 4px;
}

.skeleton-text-short {
  width: 80%;
  height: 16px;
  border-radius: 4px;
}

.skeleton-meta {
  display: flex;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
}

.skeleton-meta-item {
  width: 80px;
  height: 16px;
  border-radius: 4px;
}
</style>