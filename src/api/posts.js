// src/api/posts.js

import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.oluwasetemi.dev',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get paginated published blog posts (OPTIMIZED FOR PERFORMANCE)
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Posts per page (default: 12)
 * @returns {Promise}
 */
export async function getAllPosts(page = 1, limit = 12) {
  try {
    const response = await api.get('/posts', {
      params: {
        status: 'PUBLISHED',
        page: page,
        limit: limit,
        sort: 'DESC'
      },
    });

    // Handle different API response formats
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        meta: {
          total: response.data.length,
          page: 1,
          limit: response.data.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        },
      };
    }

    return response.data;

  } catch (error) {
    console.error('Error fetching all posts:', error);

    // Timeout error
    if (error.code === 'ECONNABORTED') {
      throw new Error(
        'Request timed out. Please check your internet connection.'
      );
    }

    // Server error
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
        'Failed to fetch blog posts.'
      );
    }

    // Network error
    throw new Error(
      'Unable to connect to the server. Please try again later.'
    );
  }
}

/**
 * Get ALL posts without pagination (USE SPARINGLY - PERFORMANCE IMPACT)
 * @returns {Promise}
 */
export async function getAllPostsUnpaginated() {
  try {
    const response = await api.get('/posts', {
      params: {
        status: 'PUBLISHED',
        all: true
      },
    });

    // Handle different API response formats
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        meta: {},
      };
    }

    return response.data;

  } catch (error) {
    console.error('Error fetching all posts:', error);

    // Timeout error
    if (error.code === 'ECONNABORTED') {
      throw new Error(
        'Request timed out. Please check your internet connection.'
      );
    }

    // Server error
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
        'Failed to fetch blog posts.'
      );
    }

    // Network error
    throw new Error(
      'Unable to connect to the server. Please try again later.'
    );
  }
}

/**
 * Get a single post by ID
 * @param {string} id
 * @returns {Promise}
 */
export async function getPostById(id) {
  try {
    const response = await api.get(`/posts/${id}`);

    return response.data;

  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);

    if (error.response?.status === 404) {
      throw new Error('Post not found');
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error(
        'Request timed out. Please try again.'
      );
    }

    throw new Error(
      'Failed to fetch post. Please try again later.'
    );
  }
}

/**
 * Get a single post by slug
 * @param {string} slug
 * @returns {Promise}
 */
export async function getPostBySlug(slug) {
  try {
    const response = await api.get(`/posts/slug/${slug}`);

    return response.data;

  } catch (error) {
    console.error(
      `Error fetching post with slug ${slug}:`,
      error
    );

    if (error.response?.status === 404) {
      throw new Error('Post not found');
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error(
        'Request timed out. Please try again.'
      );
    }

    throw new Error(
      'Failed to fetch post. Please try again later.'
    );
  }
}