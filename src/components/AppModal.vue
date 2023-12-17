<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <h4 class="modal-title">{{ props.title }}</h4>
        <div class="button-container">
          <button class="confirm-button" @click="$emit('confirm')">
            {{ props.action }}
          </button>
          <button class="cancel-button" @click="$emit('cancel')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  action: String,
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 5px;
}

.modal-title {
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.confirm-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

.confirm-button {
  background-color: #4caf50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}
.no-data-message {
  color: red;
  font-size: 18px;
  text-align: center;
}
</style>
