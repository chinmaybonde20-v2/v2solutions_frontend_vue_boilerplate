<template>
  <div class="login-container">
    <form class="signup-form form-focus" @submit.prevent="signup">
      <h2 class="text-center mb-4 display-6">Signup</h2>
      <br />

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          class="form-control"
          placeholder="Enter your name"
          @input="() => performValidation('name')"
        />
        <p id="nameErrMsg" class="error-text">{{ nameError }}</p>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="text"
          id="email"
          class="form-control"
          placeholder="Enter your email"
          @input="() => performValidation('email')"
        />
        <p id="emailErrMsg" class="error-text">{{ emailError }}</p>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="form-control"
          placeholder="Enter password"
          @input="() => performValidation('password')"
        />
        <p id="passwordErrMsg" class="error-text">{{ passwordError }}</p>
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          class="form-control"
          placeholder="Confirm your password"
          @input="() => performValidation('confirmPassword')"
        />
        <p id="cnfPasswordErrMsg" class="error-text">
          {{ confirmPasswordError }}
        </p>
      </div>
      <div class="mb-3">
        <label for="country" class="form-label">Country</label>
        <select
          v-model="country"
          id="country"
          class="form-select"
          @change="() => performValidation('country')"
        >
          <option value="" disabled>Select country</option>
          <option value="india">India</option>
          <option value="us">United States</option>
        </select>
        <p id="countryErrMsg" class="error-text">{{ countryError }}</p>
      </div>
      <p v-if="serverError" class="error-text">{{ serverError }}</p>

      <button class="btn btn-primary">Signup</button>
      <p class="mt-3">
        If you already have an account,
        <router-link to="/login" class="signup-link"
          >click here to login</router-link
        >
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import { serverError, setErrorMessage } from "@/helpers/validation";
import { validateSignupForm } from "@/helpers/formValidations";

const router = useRouter();
const store = useStore();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const country = ref("");
const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const countryError = ref("");
const qrCode = ref("");

const signup = async () => {
  if (checkForValidationErrors()) {
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_BASE_URL}/signup`,
      {
        name: name.value,
        email: email.value,
        password: password.value,
        country: country.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      if (data.error === "Email is already in use.") {
        setErrorMessage(data.error);
      } else {
        qrCode.value = data.qrCodeUrl;
        localStorage.setItem("qrCodeUrl", qrCode.value);
        store.commit("setEmail", email.value);
        router.push("/mfa-verify");
      }
    } else {
      console.error("Error signing up:", response.statusText);
      const data = response.data;
      setErrorMessage(data.error || "Signup failed");
    }
  } catch (error) {
    console.error("Error signing up:", error);
    setErrorMessage("Signup failed");
  }
};

// Validation
const performValidation = (fieldName) => {
  validateSignupForm(
    fieldName,
    name,
    email,
    password,
    confirmPassword,
    country,
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
    countryError
  );
};

const checkForValidationErrors = () => {
  performValidation();
  return (
    nameError.value ||
    emailError.value ||
    passwordError.value ||
    confirmPasswordError.value ||
    countryError.value
  );
};

const clearErrorMessages = () => {
  nameError.value = "";
  emailError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";
  countryError.value = "";
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

.error-text {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
