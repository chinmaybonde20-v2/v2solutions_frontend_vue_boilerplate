<template>
  <footer class="footer">
    &copy; {{ currentYear }} V2Solutions. All Rights Reserved.
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped="true">
.footer {
  background-color: #000;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
