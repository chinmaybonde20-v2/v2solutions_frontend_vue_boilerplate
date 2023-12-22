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
    wrapper.find("input#email").setValue("chinmaybonde20@gmail.com");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#emailErrMsg").text()).toBe("");

    wrapper.find("input#email").setValue("invalid-email");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#emailErrMsg").text()).toContain(
      "Invalid email format"
    );
  });

  it("validates the password field on input", async () => {
    const wrapper = mount(Login);
    wrapper.find("input#password").setValue("Cccccccc@20");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#passwordErrMsg").text()).toBe("");
    wrapper.find("input#password").setValue("");
    await wrapper.find("input#password").trigger("input");
    await wrapper.vm.$nextTick();
    const errorMessage = wrapper.find("#passwordErrMsg").text().trim();
    expect(errorMessage).toContain("Password is required");
  });

  it("submits the form on button click with correct credentials", async () => {
    const wrapper = mount(Login);
    wrapper.find("input#email").setValue("chinmaybonde20@gmail.com");
    wrapper.find("input#password").setValue("Cccccccc@20");
    await wrapper.vm.$nextTick();

    wrapper.find("button.btn-primary").trigger("click");
  });

  it("does not submit the form on button click with incorrect credentials", async () => {
    const wrapper = mount(Login);
    wrapper.find("input#email").setValue("invalidemail");
    wrapper.find("input#password").setValue("invalidpassword");
    await wrapper.vm.$nextTick();

    wrapper.find("button.btn-primary").trigger("click");
  });
});
