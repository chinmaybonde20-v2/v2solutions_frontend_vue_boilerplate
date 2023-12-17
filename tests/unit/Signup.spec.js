import { mount } from "@vue/test-utils";
import SignUp from "@/modules/auth/views/AppSignup.vue";

describe("SignUp", () => {
  // Other test cases...

  it("validates the email field on input", async () => {
    const wrapper = mount(SignUp);
    // Invalid email input
    wrapper.find("input#email").setValue("invalid-email");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain(
      "Invalid email format"
    );

    // Valid email input
    wrapper.find("input#email").setValue("test@example.com");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");
  });

  it("validates the password field on input", async () => {
    const wrapper = mount(SignUp);
    // Invalid password input
    wrapper.find("input#password").setValue("invalidpassword");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain("Password requires");

    // Valid password input
    wrapper.find("input#password").setValue("Cccccccc@20");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");
  });

  it("validates the confirm password field on input", async () => {
    const wrapper = mount(SignUp);
    // Mismatching confirm password input
    wrapper.find("input#password").setValue("Cccccccc@20");
    wrapper.find("input#confirmPassword").setValue("MismatchPassword");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain(
      "Passwords do not match"
    );

    // Matching confirm password input
    wrapper.find("input#password").setValue("Cccccccc@20");
    wrapper.find("input#confirmPassword").setValue("Cccccccc@20");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");
  });

  it("validates the country field on input", async () => {
    const wrapper = mount(SignUp);
    // Invalid country input
    wrapper.find("select#country").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain("Country is required");

    // Valid country input
    wrapper.find("select#country").setValue("india");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");
  });
});
