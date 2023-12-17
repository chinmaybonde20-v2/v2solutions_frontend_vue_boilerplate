<template>
  <div :class="{ sidenav: true, 'sidenav-collapsed': isCollapsed }">
    <div class="logo-container">
      <button class="logo" @click="toggleCollapse">
        <i class="fa fa-bars"></i>
      </button>
      <div class="logo-text" v-if="isCollapsed">
        <router-link to="/reset-pass">
          <img
            src="https://www.v2solutions.com/images/v-2-logo.svg"
            alt="Logo"
          />
        </router-link>
      </div>
    </div>

    <!-- Links -->
    <ul class="sidenav-nav">
      <li class="sidenav-nav-item">
        <router-link to="/" class="sidenav-nav-link" @click="onClickHome">
          <i class="sidenav-link-icon fa fa-home"></i>
          <span class="sidenav-link-text" v-if="isCollapsed">Home</span>
        </router-link>
      </li>
      <li class="sidenav-nav-item">
        <router-link
          to="/emp-manager"
          class="sidenav-nav-link"
          @click="onClickEmployees"
        >
          <i class="sidenav-link-icon fa fa-users"></i>
          <span class="sidenav-link-text" v-if="isCollapsed">Employees</span>
        </router-link>
      </li>

      <!-- Login -->
      <li v-if="!isLoggedIn" class="sidenav-nav-item">
        <router-link to="/login" class="sidenav-nav-link" @click="onClickLogin">
          <i class="sidenav-link-icon fa fa-sign-in-alt"></i>
          <span class="sidenav-link-text" v-if="isCollapsed">Login</span>
        </router-link>
      </li>
      <li v-else class="sidenav-nav-item">
        <p @click="showLogoutModal" class="sidenav-nav-link">
          <i class="sidenav-link-icon fa fa-power-off"></i>
          <span class="sidenav-link-text" v-if="isCollapsed">Logout</span>
        </p>
      </li>
    </ul>

    <!-- Confirmation Modal -->
    <AppModal
      v-if="showModal"
      :title="modalTitle"
      :action="modalAction"
      @confirm="confirmLogout"
      @cancel="cancelLogout"
    />
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
const isCollapsed = ref(false);

const emits = defineEmits(["isCollapsed"]);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emits("isCollapsed", isCollapsed.value);
};

// Emits end
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AppModal from "@/components/AppModal.vue";

const store = useStore();
const router = useRouter();

const showModal = ref(false);
const isLoggedIn = computed(() => store.state.isLoggedIn);
const modalTitle = ref("Are you sure you want to logout?");
const modalAction = ref("Logout");

const showLogoutModal = () => {
  showModal.value = true;
};

const confirmLogout = async () => {
  store.commit("setLoggedIn", false);
  store.commit("setToken", null);
  localStorage.removeItem("jwtToken");
  router.push("/");
  showModal.value = false;
};

const cancelLogout = () => {
  showModal.value = false;
};
</script>
<style scoped>
/* Add your CSS styles for the sidebar here */
/* Ensure styles are consistent with the provided Angular sidebar styles */
/* Add your CSS styles for the sidebar here */
/* Ensure styles are consistent with the provided Angular sidebar styles */
.sidenav {
  background: #263268;
  transition: all 0.5s ease;
  position: absolute;
  z-index: 1;
  top: 0;
  width: 5rem;
  height: 100%;
  position: fixed;
  box-shadow: 0.063rem 0 1.25rem 0 #8690a3;
}

.sidenav .logo-container {
  display: flex;
  align-items: center;
  padding: 0.938rem 0.938rem 0 0.938rem;
  width: 100%;
}

.sidenav .logo-container .logo {
  background: #fff;
  text-align: center;
  width: 3rem;
  min-width: 3rem;
  border-radius: 0.313rem;
  padding: 0.313rem;
  font-size: 24px;
  font-weight: 900;
  cursor: pointer;
  border: none;
}

.sidenav .logo-container .logo-text {
  margin-left: 0.8rem;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.sidenav .logo-container .btn-close {
  margin: 0 0 6px 5px;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  /* border-radius: 50%; */
  background-color: transparent;
  border: none;
}

.sidenav .logo-container .btn-close .fa-times {
  color: #fff;
  font-size: 20px;
}

.sidenav .sidenav-nav {
  list-style: none;
  padding: 0.938rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 3.65rem);
  cursor: pointer;
}

.sidenav .sidenav-nav .sidenav-nav-item {
  width: 100%;
  margin-bottom: 0.625rem;
}

.sidenav .sidenav-nav .sidenav-nav-link {
  display: flex;
  align-items: center;
  height: 3rem;
  color: #f3f3f3;
  text-decoration: none;
  border-radius: 0.625rem;
  transition: all 0.3s ease;
}

.sidenav .sidenav-nav .sidenav-nav-link .sidenav-link-icon {
  font-size: 22px;
  width: 2rem;
  min-width: 2rem;
  margin: 0 0.5rem;
  text-align: center;
}

.sidenav .sidenav-nav .sidenav-nav-link .sidenav-link-text {
  margin-left: 0.5rem;
}

.sidenav .sidenav-nav .sidenav-nav-item:hover .sidenav-nav-link {
  background-color: #fff;
  color: #000;
}

.sidenav-collapsed {
  width: 18rem;
}
</style>
