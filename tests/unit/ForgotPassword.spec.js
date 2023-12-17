import { mount } from "@vue/test-utils";
import ForgotPassword from "@/modules/auth/views/ForgotPassword.vue";

describe("ForgotPassword", () => {
  it("renders the forgot password form correctly", () => {
    const wrapper = mount(ForgotPassword);
    expect(wrapper.find("form.login-form").exists()).toBe(true);
    expect(wrapper.find("input#email").exists()).toBe(true);
  });

  it("validates the form on input", async () => {
    const wrapper = mount(ForgotPassword);
    wrapper.find("input#email").setValue("chinmaybonde20@gmail.com");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".error-text").text()).toBe("");
    wrapper.find("input#email").setValue("invalid-email");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error-text").text()).toContain("Invalid email");
  });

  it("submits the form on button click", async () => {
    const wrapper = mount(ForgotPassword);
    wrapper.find("input#email").setValue("test@example.com");
  });
});
