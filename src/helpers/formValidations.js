import { validateField } from "@/helpers/validation";

// Login form
export const validateLoginForm = (
  fieldName = null,
  email,
  password,
  emailError,
  passwordError
) => {
  if (fieldName) {
    switch (fieldName) {
      case "email":
        emailError.value = validateField(email.value, "email");
        break;
      case "password":
        passwordError.value = validateField(password.value, "password");
        break;
      default:
        break;
    }
  } else {
    emailError.value = validateField(email.value, "email");
    passwordError.value = validateField(password.value, "password");
  }
};

// Signup form
export const validateSignupForm = (
  fieldName = null,
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
) => {
  if (fieldName) {
    switch (fieldName) {
      case "name":
        nameError.value = validateField(name.value, "name");
        break;
      case "email":
        emailError.value = validateField(email.value, "email");
        break;
      case "password":
        passwordError.value = validateField(password.value, "password");
        break;
      case "confirmPassword":
        confirmPasswordError.value = validateField(
          confirmPassword.value,
          "confirmPassword",
          password.value
        );
        break;
      case "country":
        countryError.value = validateField(country.value, "country");
        break;
      default:
        break;
    }
  } else {
    nameError.value = validateField(name.value, "name");
    emailError.value = validateField(email.value, "email");
    passwordError.value = validateField(password.value, "password");
    confirmPasswordError.value = validateField(
      confirmPassword.value,
      "confirmPassword",
      password.value
    );
    countryError.value = validateField(country.value, "country");
  }
};

// MFA form
export const validateMFAForm = (fieldName = null, mfaOTP, mfaOtpError) => {
  if (fieldName) {
    switch (fieldName) {
      case "otp":
        mfaOtpError.value = validateField(mfaOTP.value, "otp");
        break;
    }
  } else {
    mfaOtpError.value = validateField(mfaOTP.value, "otp");
  }
};

// Forgot password form
export const validateForgotPasswordForm = (
  fieldName = null,
  email,
  emailError
) => {
  if (fieldName) {
    switch (fieldName) {
      case "email":
        emailError.value = validateField(email.value, "email");
        break;
    }
  } else {
    emailError.value = validateField(email.value, "email");
  }
};

// Reset form
export const validateResetForm = (
  fieldName = null,
  otp,
  password,
  confirmPassword,
  otpError,
  passwordError,
  confirmPasswordError
) => {
  if (fieldName) {
    switch (fieldName) {
      case "otp":
        otpError.value = validateField(otp.value, "otp");
        break;
      case "password":
        passwordError.value = validateField(password.value, "password");
        break;
      case "confirmPassword":
        confirmPasswordError.value = validateField(
          confirmPassword.value,
          "confirmPassword",
          password.value
        );
        break;
      default:
        break;
    }
  } else {
    otpError.value = validateField(otp.value, "otp");
    passwordError.value = validateField(password.value, "password");
    confirmPasswordError.value = validateField(
      confirmPassword.value,
      "confirmPassword",
      password.value
    );
  }
};

// Employee form
export const validateEmployeeForm = (
  fieldName = null,
  employeeName,
  employeeEmail,
  employeeDOB,
  employeeEducation,
  employeeDesignation,
  employeeNameError,
  employeeEmailError,
  employeeDOBError,
  employeeEducationError,
  employeeDesignationError
) => {
  if (fieldName) {
    switch (fieldName) {
      case "employeeName":
        employeeNameError.value = validateField(employeeName.value, "name");
        break;
      case "employeeEmail":
        employeeEmailError.value = validateField(employeeEmail.value, "email");
        break;
      case "employeeDOB":
        employeeDOBError.value = validateField(employeeDOB.value, "dob");
        break;
      case "employeeEducation":
        employeeEducationError.value = validateField(
          employeeEducation.value,
          "education"
        );
        break;
      case "employeeDesignation":
        employeeDesignationError.value = validateField(
          employeeDesignation.value,
          "designation"
        );
        break;
      default:
        break;
    }
  } else {
    employeeNameError.value = validateField(employeeName.value, "name");
    employeeEmailError.value = validateField(employeeEmail.value, "email");
    employeeDesignationError.value = validateField(
      employeeDesignation.value,
      "designation"
    );
    employeeEducationError.value = validateField(
      employeeEducation.value,
      "education"
    );
    employeeDOBError.value = validateField(employeeDOB.value, "dob");
  }
};
