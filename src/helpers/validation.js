import { ref } from "vue";

export let serverError = ref("");

export const validateField = (value, type, confirmValue = null) => {
  switch (type) {
    case "email":
      return validateEmail(value);
    case "password":
      return validatePassword(value);
    case "confirmPassword":
      return validateConfirmPassword(value, confirmValue);
    case "otp":
      return validateOTP(value);
    case "name":
      return validateName(value);
    case "designation":
      return validateDesignation(value);
    case "education":
      return validateEducation(value);
    case "country":
      return validateCountry(value);
    case "dob":
      return validateDOB(value);
    default:
      return "";
  }
};

export const validateEmail = (email) => {
  setErrorMessage("");
  if (!email.trim()) {
    return "Email is required";
  }
  const emailPattern =
    /^((?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|((?:[a-zA-Z\-0-9]+\.)+([a-zA-Z]{2,})))$/;

  return emailPattern.test(email) ? "" : "Invalid email format";
};

export const validatePassword = (password) => {
  setErrorMessage("");
  if (!password.trim()) {
    return "Password is required";
  }
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return passwordPattern.test(password)
    ? ""
    : "Password requires 1 uppercase, 1 lowercase, 1 digit, 1 special character, min. 8 characters.";
};

export const validateConfirmPassword = (confirmPassword, password) => {
  setErrorMessage("");
  if (!confirmPassword.trim()) {
    return "Password is required";
  }
  return confirmPassword === password ? "" : "Passwords do not match";
};

export const validateOTP = (otp, isTokenProvided = false) => {
  setErrorMessage("");
  if (!otp.trim()) {
    return "OTP is required";
  }
  if (isTokenProvided) {
    return "";
  } else {
    const otpPattern = /^\d{6}$/;
    return otpPattern.test(otp) ? "" : "OTP must be a 6-digit number";
  }
};

export const validateName = (name) => {
  setErrorMessage("");
  if (!name.trim()) {
    return "Name is required";
  }
  const namePattern = /^[A-Za-z\- ']{2,30}$/;
  return namePattern.test(name)
    ? ""
    : "Name must be between 3 to 15 alphabetical characters long.";
};

export const validateDesignation = (designation) => {
  setErrorMessage("");

  if (!designation.trim()) {
    return "Designation is required";
  }
  const designationPattern = /^[A-Za-z\- ']{2,30}$/;
  return designationPattern.test(designation)
    ? ""
    : "Designation must be between 3 to 15 alphabetical  characters long.";
};

export const validateEducation = (education) => {
  setErrorMessage("");

  if (!education.trim()) {
    return "Education is required";
  }
  const educationPattern = /^[A-Za-z\- ']{2,30}$/;
  return educationPattern.test(education)
    ? ""
    : "Education must be between 3 to 15 alphabetical characters long.";
};

export const validateCountry = (country) => {
  setErrorMessage("");
  return country ? "" : "Country is required";
};

export const validateDOB = (dob) => {
  setErrorMessage("");
  const today = new Date();
  const inputDate = new Date(dob);

  if (!dob.trim()) {
    return "Date of Birth is required";
  }

  const minDate = new Date("1900-01-01");

  if (inputDate > today) {
    return "Date of Birth cannot be a future date";
  }

  if (inputDate < minDate) {
    return "Please select a date after 1/1/1900";
  }

  const ageLimitDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const formattedAgeLimitDate = `${(ageLimitDate.getDate() + "").padStart(
    2,
    "0"
  )}-${(ageLimitDate.getMonth() + 1 + "").padStart(
    2,
    "0"
  )}-${ageLimitDate.getFullYear()}`;

  if (inputDate > ageLimitDate) {
    return `Age must be above 18, Select a date prior to ${formattedAgeLimitDate}`;
  }

  return "";
};

// Server error message
export const setErrorMessage = (message) => {
  serverError.value = message;
};
