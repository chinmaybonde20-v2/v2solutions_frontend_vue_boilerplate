<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2 class="text-center mb-4 display-6">Login</h2>
      <br />

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
          type="text"
          id="password"
          class="form-control"
          placeholder="Enter your password"
          @input="performValidation('password')"
        />
        <p id="passwordErrMsg" class="error-text">
          {{ passwordError }}
        </p>
      </div>
      <p v-if="serverError" class="error-text">{{ serverError }}</p>

      <div class="d-flex align-items-center mb-3">
        <button class="btn btn-primary">Login</button>
        <p class="forgot-text">
          <router-link to="/forgot-pass" class="signup-link"
            >Forgot password ?</router-link
          >
        </p>
      </div>

      <div>
        <p>
          Not a member?
          <router-link to="/signup" class="signup-link">Register</router-link>
        </p>
      </div>
      <hr />
      <GoogleSignInVue />
    </form>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import GoogleSignInVue from "./GoogleSignIn.vue";
import { serverError, setErrorMessage } from "@/helpers/validation";
import { validateLoginForm } from "@/helpers/formValidations";

const store = useStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");

const login = async () => {
  if (checkForValidationErrors()) {
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_BASE_URL}/login`,
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      store.commit("setIsMFAFromLogin", true);
      store.commit("setEmail", email.value);
      router.push("/mfa-verify");
    } else {
      const data = response.data;
      setErrorMessage(data.error || "Login failed");
    }
  } catch (error) {
    setErrorMessage("Login failed");
  }
};

// Validation
const performValidation = (fieldName) => {
  validateLoginForm(fieldName, email, password, emailError, passwordError);
};

const checkForValidationErrors = () => {
  performValidation();
  return emailError.value || passwordError.value;
};

const clearErrorMessages = () => {
  emailError.value = "";
  passwordError.value = "";
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

.forgot-text {
  margin-left: 100px;
  margin-top: 10px;
}
.btn-google {
  border: 1px solid rgb(190, 190, 190);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
}
.btn-google:hover {
  background-color: rgb(231, 229, 229);
}
img {
  height: 30px;
  width: 30px;
  margin-right: 5px;
}
</style>
