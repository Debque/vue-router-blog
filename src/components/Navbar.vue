<script setup>
import { ref, onMounted } from 'vue';

const isDarkMode = ref(false);

// Check for saved dark mode preference or system preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo and Title -->
      <div class="navbar-brand">
        <router-link to="/" class="logo">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text">STELLA'S BLOG</span>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="navbar-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        
        <!-- Dark Mode Toggle -->
        <button 
          @click="toggleDarkMode" 
          class="dark-mode-toggle" 
          :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <!-- Moon Icon (Light Mode) -->
          <svg v-if="!isDarkMode" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <!-- Sun Icon (Dark Mode) -->
          <svg v-else class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Dark mode navbar */
.dark .navbar {
  background-color: #1f2937;
  border-bottom-color: #374151;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Section */
.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #111827;
  font-weight: 700;
  font-size: 1.25rem;
  transition: color 0.2s;
}

.dark .logo {
  color: #f9fafb;
}

.logo:hover {
  color: #10b981;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #10b981;
}

.logo-text {
  font-family: 'Arial', sans-serif;
}

/* Navigation Links */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s;
  position: relative;
}

.dark .nav-link {
  color: #9ca3af;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #10b981;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #10b981;
  background-color: #f3f4f6;
}

.dark .nav-link:hover {
  background-color: #374151;
}

.nav-link:hover::after {
  width: 60%;
}

.nav-link.router-link-active {
  color: #10b981;
  font-weight: 600;
}

.nav-link.router-link-active::after {
  width: 60%;
}

/* Dark Mode Toggle */
.dark-mode-toggle {
  background-color: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #6b7280;
}

.dark .dark-mode-toggle {
  background-color: #374151;
  color: #f59e0b;
}

.dark-mode-toggle:hover {
  background-color: #e5e7eb;
  color: #10b981;
  transform: rotate(15deg);
}

.dark .dark-mode-toggle:hover {
  background-color: #4b5563;
  color: #fbbf24;
}

.icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

/* Responsive Design */
@media (max-width: 640px) {
  .navbar-container {
    padding: 0.75rem 1rem;
  }

  .logo-text {
    font-size: 1rem;
  }

  .navbar-links {
    gap: 0.75rem;
  }

  .nav-link {
    font-size: 0.875rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>