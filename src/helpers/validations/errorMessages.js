import { ref, onBeforeUnmount, onMounted } from "vue";

export const nameErrorMessage = ref("");
export const emailErrorMessage = ref("");
export const passwordErrorMessage = ref("");
export const confirmPasswordErrorMessage = ref("");
export const countryErrorMessage = ref("");

export let serverError = ref("");

export const handleOutsideClick = (event) => {
  const formContainer = document.querySelector(".form-focus");

  if (formContainer && !formContainer.contains(event.target)) {
    clearErrors();
  }
};

export const outsideClickListener = () => {
  onMounted(() => {
    document.addEventListener("click", handleOutsideClick);
  });
};

export const removeOutsideClickListener = () => {
  onBeforeUnmount(() => {
    document.removeEventListener("click", handleOutsideClick);
  });
};

export const clearErrors = () => {
  emailErrorMessage.value = "";
  passwordErrorMessage.value = "";
  setErrorMessage("");
};

// Server error message
export const setErrorMessage = (message) => {
  serverError.value = message;
};
