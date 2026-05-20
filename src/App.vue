<script setup>
import { Suspense } from 'vue';
import Navbar from './components/Navbar.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import ErrorBoundary from './views/ErrorBoundary.vue';
import ScrollToTop from './components/ScrollToTop.vue';
</script>

<template>
  <div id="app">
    <!-- Navigation Bar -->
    <Navbar />

    <!-- Main Content Area with Error Boundary and Suspense -->
    <ErrorBoundary>
      <Suspense>
        <!-- Default: Show the actual page content -->
        <template #default>
          <router-view v-slot="{ Component, route }">
            <transition name="page" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </template>

        <!-- Fallback: Show loading spinner while page loads -->
        <template #fallback>
          <LoadingSpinner />
        </template>
      </Suspense>
    </ErrorBoundary>
    <ScrollToTop />
  </div>
</template>

<style>
/* Global CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Global Styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
  color: #111827;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Remove default link styles */
a {
  text-decoration: none;
  color: inherit;
}

/* Remove default button styles */
button {
  font-family: inherit;
}

/* Remove default list styles */
ul, ol {
  list-style: none;
}


/* ... existing styles ... */

/* ============================================
   PAGE TRANSITIONS
   ============================================ */

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Alternative: Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Alternative: Slide up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>