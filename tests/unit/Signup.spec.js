import { mount } from "@vue/test-utils";
import Signup from "@/modules/auth/views/AppSignup.vue";
describe("Signup", () => {
  it("renders the signup form correctly", () => {
    const wrapper = mount(Signup);
    expect(wrapper.find("form.signup-form").exists()).toBe(true);
    expect(wrapper.find("input#name").exists()).toBe(true);
    expect(wrapper.find("input#email").exists()).toBe(true);
    expect(wrapper.find("input#password").exists()).toBe(true);
    expect(wrapper.find("input#confirmPassword").exists()).toBe(true);
    expect(wrapper.find("select#country").exists()).toBe(true);
    expect(wrapper.find("button.btn-primary").text()).toBe("Signup");
  });

  it("validates the name field on input", async () => {
    const wrapper = mount(Signup);
    // Valid name input
    wrapper.find("input#name").setValue("John Doe");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");

    // Invalid name input (e.g., empty name)
    wrapper.find("input#name").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain("Name is required");
  });

  it("validates the email field on input", async () => {
    const wrapper = mount(Signup);
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
    const wrapper = mount(Signup);
    // Valid password input
    wrapper.find("input#password").setValue("Test@123");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");

    // Invalid password input (e.g., weak password)
    wrapper.find("input#password").setValue("weakpass");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain("Password must");
    // Add expectations for specific password requirements (e.g., minimum length, special characters)
  });

  it("validates the confirmPassword field on input", async () => {
    const wrapper = mount(Signup);
    // Valid confirmation password input
    wrapper.find("input#password").setValue("Test@123");
    wrapper.find("input#confirmPassword").setValue("Test@123");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");

    // Invalid confirmation password input (e.g., mismatch with password)
    wrapper.find("input#password").setValue("Test@123");
    wrapper.find("input#confirmPassword").setValue("MismatchedPass");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain(
      "Passwords do not match"
    );
  });

  it("validates the country field on selection", async () => {
    const wrapper = mount(Signup);
    // Valid country selection
    wrapper.find("select#country").setValue("india");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toBe("");

    // Invalid country selection (e.g., no country selected)
    wrapper.find("select#country").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain("Country is required");
  });

  it("submits the form on button click with correct inputs", async () => {
    const wrapper = mount(Signup);
    // Set valid inputs
    wrapper.find("input#name").setValue("John Doe");
    wrapper.find("input#email").setValue("john@example.com");
    wrapper.find("input#password").setValue("Strong@Password123");
    wrapper.find("input#confirmPassword").setValue("Strong@Password123");
    wrapper.find("select#country").setValue("india");
    await wrapper.vm.$nextTick();

    // Simulate the button click event
    wrapper.find("button.btn-primary").trigger("click");
    // You may want to check the logic after a successful signup here
    // For example, checking the router push or state changes after successful signup
    // And also checking that the signup fetch request is sent with the expected data
  });

  it("does not submit the form on button click with incorrect inputs", async () => {
    const wrapper = mount(Signup);
    // Set invalid inputs
    wrapper.find("input#name").setValue("");
    wrapper.find("input#email").setValue("invalid-email");
    wrapper.find("input#password").setValue("weakpass");
    wrapper.find("input#confirmPassword").setValue("MismatchedPass");
    wrapper.find("select#country").setValue("");
    await wrapper.vm.$nextTick();

    // Simulate the button click event
    wrapper.find("button.btn-primary").trigger("click");
    // Assert that the form is not submitted when the inputs are incorrect
    // Check if the error messages are displayed appropriately for each input field
  });
});
