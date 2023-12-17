<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h1 class="mb-4">Welcome to V2Solutions Vue.js Boilerplate</h1>
          <hr />
          <div v-if="!store.state.isLoggedIn">
            <h2>Please login first</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<style scoped>
.container {
  font-family: "Arial", sans-serif;
}

.text-center {
  margin-top: 20px;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
}

/* Adjust the h1 alignment based on the sidebar's width */
@media screen and (min-width: 5rem) {
  .container {
    display: flex;
    justify-content: center;
  }

  .row {
    width: 100%;
  }

  .col-md-8 {
    max-width: 100%;
  }
}
</style>
