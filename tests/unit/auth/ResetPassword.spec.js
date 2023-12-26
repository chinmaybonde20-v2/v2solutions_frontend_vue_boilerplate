import { createRouter, createMemoryHistory } from "vue-router";
import { mount } from "@vue/test-utils";
import ResetPassword from "@/modules/auth/views/ResetPassword.vue";
import { useRouter } from "vue-router";

jest.mock("vue-router", () => ({
  ...jest.requireActual("vue-router"),
  useRouter: jest.fn(),
}));

describe("ResetPassword", () => {
  let wrapper;

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/reset-password/:token",
        name: "ResetPassword",
        component: ResetPassword,
      },
    ],
  });

  useRouter.mockReturnValue(router);

  beforeEach(() => {
    wrapper = mount(ResetPassword, {
      global: {
        plugins: [router],
      },
      mocks: {
        $route: {
          params: {
            token: "989d7950-b88a-453f-afff-408fd33a1c28",
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the reset password form correctly", () => {
    expect(wrapper.find("#form").exists()).toBe(true);
    expect(wrapper.find("input#otp").exists()).toBe(true);
    expect(wrapper.find("input#password").exists()).toBe(true);
    expect(wrapper.find("input#confirmPassword").exists()).toBe(true);
    expect(wrapper.find("button.btn-primary").text()).toBe("Reset Password");
  });

  it("validates the OTP field on input if token is not provided", async () => {
    const wrapper = mount(ResetPassword);
    wrapper.find("input#otp").setValue("123456");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#otpErrMsg").text()).toBe("");

    wrapper.find("input#otp").setValue("1234");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#otpErrMsg").text()).toContain(
      "OTP must be a 6-digit number"
    );
  });

  it("validates the password field on input", async () => {
    const wrapper = mount(ResetPassword);
    wrapper.find("input#password").setValue("ValidPass1$");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#passwordErrMsg").text()).toBe("");

    wrapper.find("input#password").setValue("pass");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#passwordErrMsg").text()).toContain(
      "Password requires"
    );
  });

  it("validates the confirmPassword field on input", async () => {
    const wrapper = mount(ResetPassword);

    wrapper.find("input#password").setValue("ValidPass1$");
    wrapper.find("input#confirmPassword").setValue("ValidPass1$");
    await wrapper.vm.$nextTick();

    expect(wrapper.find("#confirmErrMsg").text()).toBe("");

    wrapper.find("input#confirmPassword").setValue("pass");
    await wrapper.vm.$nextTick();

    expect(wrapper.find("#confirmErrMsg").text()).toContain(
      "Passwords do not match"
    );
  });

  it("submits the form on button click with valid input", async () => {
    const wrapper = mount(ResetPassword);
    wrapper.find("input#otp").setValue("123456");
    wrapper.find("input#password").setValue("ValidPass1$");
    wrapper.find("input#confirmPassword").setValue("ValidPass1$");
    await wrapper.vm.$nextTick();

    wrapper.find("form").trigger("submit");
  });

  it("does not submit the form on button click with invalid input", async () => {
    const wrapper = mount(ResetPassword);
    wrapper.find("input#otp").setValue("invalidOTP");
    wrapper.find("input#password").setValue("pass");
    wrapper.find("input#confirmPassword").setValue("differentPass");
    await wrapper.vm.$nextTick();

    wrapper.find("form").trigger("submit");
  });
});
