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
    wrapper.find("input#name").setValue("John Doe");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#nameErrMsg").text()).toBe("");

    wrapper.find("input#name").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#nameErrMsg").text()).toContain("Name is required");
  });

  it("validates the email field on input", async () => {
    const wrapper = mount(Signup);
    wrapper.find("input#email").setValue("test@example.com");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#emailErrMsg").text()).toBe("");

    wrapper.find("input#email").setValue("invalid-email");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#emailErrMsg").text()).toContain(
      "Invalid email format"
    );
  });

  it("validates the password field on input", async () => {
    const wrapper = mount(Signup);
    wrapper.find("input#password").setValue("StrongPassword@123");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#passwordErrMsg").text()).toBe("");

    wrapper.find("input#password").setValue("weakpass");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#passwordErrMsg").text()).toContain(
      "Password requires"
    );
  });

  it("validates the confirmPassword field on input", async () => {
    const wrapper = mount(Signup);
    wrapper.find("input#password").setValue("TestPassword@123");
    wrapper.find("input#confirmPassword").setValue("TestPassword@123");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#cnfPasswordErrMsg").text()).toBe("");

    wrapper.find("input#confirmPassword").setValue("mismatchedpass");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#cnfPasswordErrMsg").text()).toContain(
      "Passwords do not match"
    );
  });

  it("validates the country field on selection", async () => {
    const wrapper = mount(Signup);
    wrapper.find("select#country").setValue("us");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#countryErrMsg").text()).toBe("");

    wrapper.find("select#country").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#countryErrMsg").text()).toContain(
      "Country is required"
    );
  });

  it("submits the form on button click with valid inputs", async () => {
    const wrapper = mount(Signup);
    wrapper.find("input#name").setValue("John Doe");
    wrapper.find("input#email").setValue("test@example.com");
    wrapper.find("input#password").setValue("TestPassword@123");
    wrapper.find("input#confirmPassword").setValue("TestPassword@123");
    wrapper.find("select#country").setValue("us");
    await wrapper.vm.$nextTick();

    wrapper.find("button.btn-primary").trigger("click");
  });

  it("does not submit the form on button click with invalid inputs", async () => {
    const wrapper = mount(Signup);
    wrapper.find("input#name").setValue("");
    wrapper.find("input#email").setValue("invalid-email");
    wrapper.find("input#password").setValue("weakpass");
    wrapper.find("input#confirmPassword").setValue("mismatchedpass");
    wrapper.find("select#country").setValue("");
    await wrapper.vm.$nextTick();

    wrapper.find("button.btn-primary").trigger("click");
  });
});
