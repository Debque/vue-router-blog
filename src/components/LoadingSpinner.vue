<script setup>
// No props or logic needed - just a simple spinner
</script>

<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Loading posts...</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Dark Mode Styles */
.dark .loading-container p {
  color: #9ca3af;
}

.dark .spinner {
  border-color: #374151;
  border-top-color: #10b981;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-container p {
  color: #6b7280;
  font-size: 16px;
  margin: 0;
}
</style>