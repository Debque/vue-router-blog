<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}

function tryAgain() {
  location.reload();
}
</script>

<template>
  <div class="not-found-page">
    <div class="error-container">
      <!-- 404 Illustration -->
      <div class="illustration">
        <svg class="signpost" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Signpost pole -->
          <rect x="95" y="40" width="10" height="150" fill="#9ca3af"/>
          
          <!-- Left sign -->
          <path d="M30 80 L90 80 L85 90 L90 100 L30 100 Z" fill="#6b7280"/>
          
          <!-- Right sign -->
          <path d="M110 120 L170 120 L175 130 L170 140 L110 140 Z" fill="#6b7280"/>
          
          <!-- Ground -->
          <ellipse cx="100" cy="190" rx="40" ry="8" fill="#d1d5db"/>
          
          <!-- Plants -->
          <path d="M140 185 Q145 175 150 185" stroke="#10b981" stroke-width="2" fill="none"/>
          <path d="M50 185 Q55 175 60 185" stroke="#10b981" stroke-width="2" fill="none"/>
        </svg>
        
        <h1 class="error-code">404</h1>
      </div>

      <!-- Error Message -->
      <div class="error-content">
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="goHome" class="btn-primary">
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go Back Home
        </button>
        
        <button @click="tryAgain" class="btn-secondary">
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  padding: 2rem;
}

.error-container {
  text-align: center;
  max-width: 600px;
}

/* Illustration */
.illustration {
  position: relative;
  margin-bottom: 2rem;
}

.signpost {
  width: 200px;
  height: 200px;
  margin: 0 auto 1rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.error-code {
  font-size: 6rem;
  font-weight: 900;
  color: #1f2937;
  margin: 0;
  line-height: 1;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Error Content */
.error-content {
  margin-bottom: 2.5rem;
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
  margin: 0;
  line-height: 1.6;
}

/* Action Buttons */
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
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-secondary {
  background-color: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  background-color: #f9fafb;
  border-color: #10b981;
  color: #10b981;
}

.icon {
  width: 20px;
  height: 20px;
}

/* Dark Mode Styles for NotFound */
.dark .not-found-page {
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
}

.dark .error-code {
  color: #f9fafb;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.dark .error-title {
  color: #f9fafb;
}

.dark .error-message {
  color: #9ca3af;
}

.dark .btn-secondary {
  background-color: #1f2937;
  color: #9ca3af;
  border-color: #374151;
}

.dark .btn-secondary:hover {
  background-color: #374151;
  border-color: #10b981;
  color: #10b981;
}

/* Responsive Design */
@media (max-width: 640px) {
  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>