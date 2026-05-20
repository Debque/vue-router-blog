<script setup>
import { ref, onErrorCaptured } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const hasError = ref(false);
const errorMessage = ref('');

// Capture errors from child components
onErrorCaptured((err) => {
  hasError.value = true;
  errorMessage.value = err.message || 'An unexpected error occurred';
  console.error('Error caught by ErrorBoundary:', err);
  
  // Return false to prevent error from propagating further
  return false;
});

function tryAgain() {
  hasError.value = false;
  errorMessage.value = '';
  location.reload();
}

function goHome() {
  router.push('/');
}
</script>

<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-container">
      <!-- Error Icon -->
      <div class="error-icon-container">
        <svg class="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <!-- Error Content -->
      <h1 class="error-title">Oops! Something went wrong</h1>
      <p class="error-message">We encountered an unexpected error.</p>
      <p class="error-details">{{ errorMessage }}</p>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="tryAgain" class="btn-primary">
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
        
        <button @click="goHome" class="btn-secondary">
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go Back Home
        </button>
      </div>
    </div>
  </div>
  
  <!-- Default slot for child components -->
  <slot v-else></slot>
</template>

<style scoped>
.error-boundary {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 2rem;
}

.error-container {
  text-align: center;
  max-width: 600px;
}

.error-icon-container {
  margin-bottom: 2rem;
}

.error-icon {
  width: 100px;
  height: 100px;
  color: #ef4444;
  margin: 0 auto;
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
}

.error-message {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.error-details {
  font-size: 0.95rem;
  color: #9ca3af;
  font-style: italic;
  margin: 0 0 2rem 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #10b981;
  color: white;
}

.btn-primary:hover {
  background-color: #059669;
}

.btn-secondary {
  background-color: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  border-color: #10b981;
  color: #10b981;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>