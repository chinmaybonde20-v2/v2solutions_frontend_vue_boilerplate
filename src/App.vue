<template>
  <div class="app-container">
    <AppSidebar v-if="showSidebar" @isCollapsed="updateIsCollapsed" />
    <div class="main-content" :class="{ 'main-content-shrink': isCollapsed }">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppFooter from "./components/AppFooter.vue";
import AppSidebar from "./components/AppSidebar.vue";

const isCollapsed = ref(false);
const route = useRoute();

const updateIsCollapsed = (data) => {
  isCollapsed.value = data;
};

const routesWithoutSidebar = [
  "/",
  "/login",
  "/signup",
  "/mfa-verify",
  "/forgot-pass",
  "/reset-password",
  "/reset-password/:token",
];

watch(
  () => route.path,
  (newPath, oldPath) => {
    const shouldShowSidebar = !routesWithoutSidebar.includes(newPath);

    if (shouldShowSidebar !== !routesWithoutSidebar.includes(oldPath)) {
      showSidebar.value = shouldShowSidebar;
    }
  }
);

const showSidebar = ref(!routesWithoutSidebar.includes(route.path));
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  transition: margin-left 0.5s ease;
  margin-left: 5rem;
}

.main-content-shrink {
  margin-left: 18rem;
}
</style>
