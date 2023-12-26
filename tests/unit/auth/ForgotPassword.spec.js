import { mount } from "@vue/test-utils";
import ForgotPassword from "@/modules/auth/views/ForgotPassword.vue";

describe("ForgotPassword", () => {
  it("renders the forgot password form correctly", () => {
    const wrapper = mount(ForgotPassword);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input#email").exists()).toBe(true);
    expect(wrapper.find("button.btn-primary").text()).toBe("Get reset link");
  });

  it("validates the email field on input", async () => {
    const wrapper = mount(ForgotPassword);
    wrapper.find("input#email").setValue("test@example.com");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#emailErrMsg").text()).toBe("");

    wrapper.find("input#email").setValue("invalidemail");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#emailErrMsg").text()).toContain(
      "Invalid email format"
    );
  });

  it("submits the form on button click with valid email", async () => {
    const wrapper = mount(ForgotPassword);

    wrapper.find("input#email").setValue("test@example.com");
    await wrapper.vm.$nextTick();

    wrapper.find("form").trigger("submit");
  });

  it("does not submit the form on button click with invalid email", async () => {
    const wrapper = mount(ForgotPassword);
    wrapper.find("input#email").setValue("invalidemail");
    await wrapper.vm.$nextTick();

    wrapper.find("form").trigger("submit");
  });
});
