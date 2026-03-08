<template>
  <nav class="mobile-nav">
    <button 
      v-for="item in menuItems" 
      :key="item.id" 
      @click="$router.push(item.path)" 
      class="nav-button"
      :class="{ 'active': isActive(item.path) }"
    >
      <span v-html="item.icon" class="nav-icon"></span>
      <span class="nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

const menuItems = computed(() => [
  { id: 'dashboard', label: 'Inicio', path: '/dashboard', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>` },
  { id: 'workouts', label: 'Entrenos', path: '/workouts', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" /></svg>` },
  { id: 'progress', label: 'Progreso', path: '/progress', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>` },
  { id: 'community', label: 'Comunidad', path: '/community', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>` },
  { id: 'profile', label: 'Perfil', path: '/profile', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>` }
]);
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(220, 38, 38, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 8px 4px;
  z-index: 50;
  box-shadow: 0 -4px 20px rgba(220,38,38,0.15);
}

.nav-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  outline: none;
  height: 56px;
  border-radius: 12px;
  transition: background-color 0.2s;
}

.nav-button:hover {
  background: rgba(220, 38, 38, 0.1);
}

.nav-button.active {
  background: rgba(220, 38, 38, 0.15);
}

.nav-icon {
  color: #DC2626;
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  transition: transform 0.2s;
}

.nav-button:hover .nav-icon {
  transform: scale(1.1);
}

.nav-label {
  color: #9CA3AF;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
}

.nav-button:hover .nav-label {
  color: white;
}

.nav-button.active .nav-label {
  color: white;
}

@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}
</style>

