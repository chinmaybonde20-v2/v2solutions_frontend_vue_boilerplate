import { mount } from "@vue/test-utils";
import ResetPassword from "@/modules/auth/views/ResetPassword.vue";

describe("ResetPassword", () => {
  it("renders the reset password form correctly", () => {
    const wrapper = mount(ResetPassword);
    expect(wrapper.find("form.login-form").exists()).toBe(true);
    expect(wrapper.find("input#otp").exists()).toBe(true);
    expect(wrapper.find("input#password").exists()).toBe(true);
    expect(wrapper.find("input#confirmPassword").exists()).toBe(true);
  });

  it("validates the form on input", async () => {
    const wrapper = mount(ResetPassword);
    wrapper.find("input#otp").setValue("123456");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");

    // Simulate incorrect input for password and confirm password
    wrapper.find("input#password").setValue("Cccccccc@20");
    wrapper.find("input#confirmPassword").setValue("pass"); // Mismatch
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain(
      "Passwords do not match"
    );

    // Add more assertions for different form validation scenarios
  });

  it("submits the form on button click", async () => {
    const wrapper = mount(ResetPassword);

    // Simulate user input
    wrapper.find("input#otp").setValue("123456");
    wrapper.find("input#password").setValue("Cccccccc");
    wrapper.find("input#confirmPassword").setValue("Cccccccc");

    // Mock the API call
    const mockedFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            /* Mocked response */
          }),
      })
    );
    global.fetch = mockedFetch;

    // Trigger form submission by button click
    await wrapper.find("form").trigger("submit");

    // Check if the API was called with the correct data
    expect(mockedFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          otp: "123456",
          password: "newPassword",
          confirmPassword: "newPassword",
          token: expect.any(String), // Provide a sample token value for testing
        }),
      })
    );

    // Add assertions to ensure the correct actions upon form submission
  });
});
