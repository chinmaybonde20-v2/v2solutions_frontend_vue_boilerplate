import { mount } from "@vue/test-utils";
import MFAAuthenticator from "@/modules/auth/views/MFAAuthenticator.vue";
describe("MFAAuthenticator", () => {
  it("renders the OTP verification form correctly", () => {
    const wrapper = mount(MFAAuthenticator);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input#otp").exists()).toBe(true);
    expect(wrapper.find("button.btn-primary").text()).toBe("Verify");
  });

  it("validates the OTP field on input", async () => {
    const wrapper = mount(MFAAuthenticator);
    wrapper.find("input#otp").setValue("123456");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#mfaErrMsg").text()).toBe("");

    wrapper.find("input#otp").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#mfaErrMsg").text()).toContain("OTP is required");
  });

  it("submits the form on button click with valid OTP", async () => {
    const wrapper = mount(MFAAuthenticator);
    // Set valid OTP value
    wrapper.find("input#otp").setValue("123456");
    await wrapper.vm.$nextTick();

    wrapper.find("form").trigger("submit");
    // Add your assertions after form submission, like checking redirection or success messages
  });

  it("does not submit the form on button click with invalid OTP", async () => {
    const wrapper = mount(MFAAuthenticator);
    // Set invalid OTP value intentionally
    wrapper.find("input#otp").setValue("");
    await wrapper.vm.$nextTick();

    wrapper.find("form").trigger("submit");
    // Add your assertions after the button click to ensure the form doesn't submit
  });
});
