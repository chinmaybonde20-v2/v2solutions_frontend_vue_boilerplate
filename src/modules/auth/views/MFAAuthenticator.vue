<template>
  <div class="signup-form form-focus">
    <h2 class="text-center mb-4 display-6">Verify OTP</h2>

    <form @submit.prevent="verify">
      <div class="mb-3">
        <div class="text-center mb-4" v-if="!store.state.isMFAFromLogin">
          <img :src="qrCode" />
        </div>

        <div class="mb-3">
          <input
            v-model="mfaOTP"
            type="text"
            id="otp"
            class="form-control"
            placeholder="Enter your authenticator code"
            @input="() => performValidation('otp')"
          />
          <p id="mfaErrMsg" class="error-text">{{ mfaOtpError }}</p>
        </div>

        <p v-if="serverError" class="error-text">{{ serverError }}</p>
        <button type="submit" class="btn btn-primary">Verify</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { setErrorMessage, serverError } from "@/helpers/validation";
import { validateMFAForm } from "@/helpers/formValidations";

const router = useRouter();
const store = useStore();
const mfaOTP = ref("");
const mfaOtpError = ref("");
const email = computed(() => store.state.email);
const jwtToken = ref(localStorage.getItem("jwtToken") || "");
const qrCode = ref(localStorage.getItem("qrCodeUrl") || "");

const verify = async () => {
  if (checkForValidationErrors()) {
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_BASE_URL}/mfa-verify`,
      {
        email: email.value,
        mfaToken: mfaOTP.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // User login
    if (store.state.isMFAFromLogin) {
      if (response.status === 200) {
        const data = response.data;
        jwtToken.value = data.jwtToken;
        store.commit("setLoggedIn", true);
        store.commit("setToken", data.jwtToken);
        localStorage.setItem("jwtToken", jwtToken.value);

        alert("Logged in successfully!");
        router.push("/emp-manager");
      } else {
        const data = response.data;
        if (response.status === 401) {
          setErrorMessage("Invalid OTP");
        } else {
          setErrorMessage(data.error || "Login failed");
        }
      }
    }
    // User signup
    else {
      if (response.status === 200) {
        alert("Successfully verified");

        router.push("/login");
      } else {
        console.error("Error verifying:", response.statusText);
        setErrorMessage("Invalid OTP");
      }
    }
  } catch (error) {
    if (store.state.isMFAFromLogin) {
      setErrorMessage("Login failed");
    } else {
      console.error("Error verifying:", error);
      setErrorMessage("Error verifying: " + error.message);
    }
  }

  // Reset isMFAFromLogin
  if (!store.state.isMFAFromLogin) {
    store.commit("setIsMFAFromLogin", false);
  }
};

// Validation
const performValidation = (fieldName) => {
  validateMFAForm(fieldName, mfaOTP, mfaOtpError);
};

const checkForValidationErrors = () => {
  performValidation();
  return mfaOtpError.value;
};

const clearErrorMessages = () => {
  mfaOtpError.value = "";
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
@import "@/assets/styles/style.scss";
.mfa-authenticator {
  width: 500px;
  margin: auto;
}
</style>
