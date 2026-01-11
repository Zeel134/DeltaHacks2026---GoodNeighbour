// Good Neighbor - Shared Utilities

// ============================================
// USER AUTHENTICATION UTILITIES
// ============================================

let currentUser = null;

// Get all users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('goodNeighborUsers')) || {};
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem('goodNeighborUsers', JSON.stringify(users));
}

// Get current logged-in user
function getCurrentUser() {
  if (!currentUser) {
    currentUser = sessionStorage.getItem('currentUser');
  }
  return currentUser;
}

// Set current user
function setCurrentUser(username) {
  currentUser = username;
  sessionStorage.setItem('currentUser', username);
}

// Logout user
function logoutUser() {
  currentUser = null;
  sessionStorage.removeItem('currentUser');
}

// Check if user is authenticated
function isAuthenticated() {
  return getCurrentUser() !== null;
}

// ============================================
// TASK MANAGEMENT UTILITIES
// ============================================

// Load all tasks from localStorage
function loadAllTasks() {
  return JSON.parse(localStorage.getItem('goodNeighborTasks')) || [];
}

// Save all tasks to localStorage
function saveAllTasks(tasks) {
  localStorage.setItem('goodNeighborTasks', JSON.stringify(tasks));
}

// Load user's active tasks
function loadActiveTasks(username) {
  if (!username) username = getCurrentUser();
  if (!username) return [];
  return JSON.parse(localStorage.getItem('goodNeighborActiveTasks_' + username)) || [];
}

// Save user's active tasks
function saveActiveTasks(activeTasks, username) {
  if (!username) username = getCurrentUser();
  if (!username) return;
  localStorage.setItem('goodNeighborActiveTasks_' + username, JSON.stringify(activeTasks));
}

// ============================================
// LOCATION UTILITIES
// ============================================

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}

// Format distance for display
function formatDistance(distance) {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m away`;
  } else {
    return `${distance.toFixed(1)} km away`;
  }
}

// Get user's current location
function getUserLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        callback(location);
      },
      (error) => {
        console.error('Error getting location:', error);
        // Default to Toronto if geolocation fails
        callback({ lat: 43.6532, lng: -79.3832 });
      }
    );
  } else {
    console.error('Geolocation not supported');
    callback({ lat: 43.6532, lng: -79.3832 });
  }
}

// ============================================
// TIME UTILITIES
// ============================================

// Calculate time ago from timestamp
function getTimeAgo(timestamp) {
  const now = new Date();
  const taskTime = new Date(timestamp);
  const diffMs = now - taskTime;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// ============================================
// CATEGORY UTILITIES
// ============================================

// Get category display name
function getCategoryName(category) {
  const categories = {
    'moving': 'Moving & Transport',
    'gardening': 'Gardening & Yard Work',
    'shopping': 'Shopping & Errands',
    'tech': 'Tech Support',
    'cleaning': 'Cleaning',
    'repairs': 'Repairs & Maintenance',
    'other': 'Other'
  };
  return categories[category] || category;
}

// ============================================
// UI UTILITIES
// ============================================

// Show error message
function showError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    setTimeout(() => {
      errorEl.style.display = 'none';
    }, 3000);
  }
}

// Show success message
function showSuccess(elementId, message) {
  const successEl = document.getElementById(elementId);
  if (successEl) {
    successEl.textContent = message;
    successEl.style.display = 'block';
    setTimeout(() => {
      successEl.style.display = 'none';
    }, 3000);
  }
}

// Navigate to page
function navigateTo(page) {
  window.location.href = page;
}
