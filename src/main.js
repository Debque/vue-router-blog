// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

// Create Vue app instance
const app = createApp(App);

// Use Vue Router
app.use(router);

// Mount app to #app element in index.html
app.mount('#app');