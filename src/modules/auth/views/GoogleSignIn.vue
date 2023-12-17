<template>
  <div class="text-center">
    <GoogleLogin :callback="callback" promt />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { setErrorMessage } from "@/helpers/validation";
import axios from "axios";

const router = useRouter();
const store = useStore();

const callback = async (response) => {
  try {
    const jwtTokenGoogle = response.credential;
    const res = await verifyGoogleToken(jwtTokenGoogle);

    if (res && res.jwtToken) {
      store.commit("setToken", res.jwtToken);
      store.commit("setLoggedIn", true);
      localStorage.setItem("jwtToken", res.jwtToken);
      router.push("/emp-manager");
      alert("Logged in successfully!");
    } else {
      setErrorMessage("Verification Failed or JWT Token not received");
    }
  } catch (error) {
    setErrorMessage("Error during Google token verification:", error);
  }
};

const verifyGoogleToken = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_BASE_URL}/verify-google-token`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Verification API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw error;
  }
};
</script>

<style></style>
