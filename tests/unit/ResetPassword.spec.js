import { mount } from "@vue/test-utils";
import ResetPassword from "@/modules/auth/views/ResetPassword.vue";

describe("ResetPassword", () => {
  it("renders the reset password form correctly", () => {
    const wrapper = mount(ResetPassword);
    expect(wrapper.find("form.login-form").exists()).toBe(true);
    expect(wrapper.find("input#password").exists()).toBe(true);
    expect(wrapper.find("input#confirmPassword").exists()).toBe(true);
    expect(wrapper.find("button.btn-primary").text()).toBe("Reset Password");
  });

  it("validates the password field on input", async () => {
    const wrapper = mount(ResetPassword);
    // Valid password input
    wrapper.find("input#password").setValue("New@Password123");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");

    // Invalid password input (e.g., weak password)
    wrapper.find("input#password").setValue("weakpass");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain("Password must");
    // Add expectations for specific password requirements (e.g., minimum length, special characters)
  });

  it("validates the confirmPassword field on input", async () => {
    const wrapper = mount(ResetPassword);
    // Valid confirmation password input
    wrapper.find("input#password").setValue("New@Password123");
    wrapper.find("input#confirmPassword").setValue("New@Password123");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");

    // Invalid confirmation password input (e.g., mismatch with password)
    wrapper.find("input#password").setValue("New@Password123");
    wrapper.find("input#confirmPassword").setValue("MismatchedPass");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain("Passwords do not match");
  });

  it("validates the OTP field on input when token not provided", async () => {
    const wrapper = mount(ResetPassword);
    // Skip if token is provided
    if (!wrapper.vm.tokenProvided) {
      // Valid OTP input
      wrapper.find("input#otp").setValue("123456");
      await wrapper.vm.$nextTick();
      expect(wrapper.find(".error-text").text()).toBe("");

      // Invalid OTP input (e.g., invalid format)
      wrapper.find("input#otp").setValue("invalidOTP");
      await wrapper.vm.$nextTick();
      expect(wrapper.find(".error-text").text()).toContain("Invalid OTP format");
    }
  });

  it("submits the form on button click with correct inputs", async () => {
    const wrapper = mount(ResetPassword);
    // Set valid inputs
    wrapper.find("input#password").setValue("New@Password123");
    wrapper.find("input#confirmPassword").setValue("New@Password123");
    if (!wrapper.vm.tokenProvided) {
      wrapper.find("input#otp").setValue("123456");
    }
    await wrapper.vm.$nextTick();

    // Simulate the button click event
    wrapper.find("button.btn-primary").trigger("submit");
    // You may want to check the logic after a successful password reset here
    // For example, checking the router push or state changes after successful password reset
    // And also checking that the reset password fetch request is sent with the expected data
  });

  it("does not submit the form on button click with incorrect inputs", async () => {
    const wrapper = mount(ResetPassword);
    // Set invalid inputs
    wrapper.find("input#password").setValue("weakpass");
    wrapper.find("input#confirmPassword").setValue("MismatchedPass");
    if (!wrapper.vm.tokenProvided) {
      wrapper.find("input#otp").setValue("invalidOTP");
    }
    await wrapper.vm.$nextTick();

    // Simulate the button click event
    wrapper.find("button.btn-primary").trigger("submit");
    // Assert that the form is not submitted when the inputs are incorrect
    // Check if the error messages are displayed appropriately for each input field
  });
});
