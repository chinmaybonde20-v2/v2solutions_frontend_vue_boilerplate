<template>
  <div class="login-container">
    <form class="login-form form-focus" @submit.prevent="resetPassword">
      <h2 class="mb-4 display-6">Reset Password</h2>
      <div class="mb-3" v-if="!tokenProvided">
        <label for="otp" class="form-label">Enter OTP</label>
        <input
          v-model="otp"
          type="text"
          id="otp"
          class="form-control"
          placeholder="Enter OTP"
          @input="() => performValidation('otp')"
        />
        <p class="error-text">{{ otpError }}</p>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">New Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="form-control"
          placeholder="Enter new password"
          @input="() => performValidation('password')"
        />
        <p class="error-text">{{ passwordError }}</p>
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label"
          >Confirm New Password</label
        >
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          class="form-control"
          placeholder="Confirm new password"
          @input="() => performValidation('confirmPassword')"
        />
        <p class="error-text">{{ confirmPasswordError }}</p>
      </div>
      <p v-if="serverError" class="error-text">{{ serverError }}</p>
      <button type="submit" class="btn btn-primary">Reset Password</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { validateResetForm } from "@/helpers/formValidations";
import { serverError, setErrorMessage } from "@/helpers/validation";

const router = useRouter();

const otp = ref("");
const password = ref("");
const confirmPassword = ref("");
const otpError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const resetPassToken = computed(() => router.currentRoute.value.params.token);
const tokenProvided = computed(() => !!resetPassToken.value);

const resetPassword = async () => {
  if (!tokenProvided.value) {
    if (checkForValidationErrors()) {
      return;
    }
  }

  try {
    const requestBody = {
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    if (!tokenProvided.value) {
      requestBody.otp = otp.value;
    } else {
      requestBody.token = resetPassToken.value;
    }

    const response = await axios.post(
      `${process.env.VUE_APP_API_BASE_URL}/reset-password`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      alert("Password reset successfully");
      router.push("/login");
    } else {
      setErrorMessage("Failed");
    }
  } catch (error) {
    console.error("Error:", error);
    setErrorMessage("Invalid or expired token");
  }
};

// Validations
const performValidation = (fieldName) => {
  validateResetForm(
    fieldName,
    otp,
    password,
    confirmPassword,
    otpError,
    passwordError,
    confirmPasswordError
  );
};
const checkForValidationErrors = () => {
  performValidation();
  return otpError.value || passwordError.value || confirmPasswordError.value;
};

const clearErrorMessages = () => {
  passwordError.value = "";
  confirmPasswordError.value = "";
  otpError.value = "";
  setErrorMessage("");
};

onMounted(() => {
  document.addEventListener("click", clearErrorMessages);
});

onUnmounted(() => {
  document.removeEventListener("click", clearErrorMessages);
});
</script>

<style scoped>
/* Styles */
.login-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.error-text {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
