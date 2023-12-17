// Import necessary functions and mount the component
import { mount } from "@vue/test-utils";
import Login from "@/modules/auth/views/AppLogin.vue";

describe("Login", () => {
  it("renders the login form correctly", () => {
    const wrapper = mount(Login);
    expect(wrapper.find("form.login-form").exists()).toBe(true);
    expect(wrapper.find("input#email").exists()).toBe(true);
    expect(wrapper.find("input#password").exists()).toBe(true);
    expect(wrapper.find("button.btn-primary").text()).toBe("Login");
  });

  it("validates the email field on input", async () => {
    const wrapper = mount(Login);
    // Valid email input
    wrapper.find("input#email").setValue("chinmaybonde20@gmail.com");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");

    // Invalid email input
    wrapper.find("input#email").setValue("invalid-email");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain(
      "Invalid email format"
    );
  });

  it("validates the password field on input", async () => {
    const wrapper = mount(Login);
    // Valid password input
    wrapper.find("input#password").setValue("Cccccccc@20");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");
    // Triggering the validation for an empty password
    wrapper.find("input#password").setValue("");
    await wrapper.find("input#password").trigger("input"); // Trigger an input event
    await wrapper.vm.$nextTick(); // Ensure the validation is invoked
    // Expecting the error message for the empty password
    const errorMessage = wrapper.find(".error-text").text().trim(); // Trim any extra spaces
    expect(errorMessage).toContain("Password is required");
  });

  it("submits the form on button click with correct credentials", async () => {
    const wrapper = mount(Login);
    wrapper.find("input#email").setValue("chinmaybonde20@gmail.com");
    wrapper.find("input#password").setValue("Cccccccc@20");
    await wrapper.vm.$nextTick();

    // Simulate the button click event
    wrapper.find("button.btn-primary").trigger("click");
    // You may want to check the logic after a successful login here
    // For example, checking the router push or state changes after successful login
    // And also checking that the login fetch request is sent with the expected data
  });

  it("does not submit the form on button click with incorrect credentials", async () => {
    const wrapper = mount(Login);
    wrapper.find("input#email").setValue("invalidemail");
    wrapper.find("input#password").setValue("invalidpassword");
    await wrapper.vm.$nextTick();

    // Simulate the button click event
    wrapper.find("button.btn-primary").trigger("click");
    // Assert that the form is not submitted when the credentials are incorrect
    // Check if the error message is displayed appropriately
  });
});
