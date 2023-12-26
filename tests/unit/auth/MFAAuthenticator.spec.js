import { mount } from "@vue/test-utils";
import MFAAuthenticator from "@/modules/auth/views/MFAAuthenticator.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("vuex", () => ({
  useStore: jest.fn(),
}));

describe("MFAAuthenticator", () => {
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };

  const mockStore = {
    state: {
      email: "example@example.com",
    },
    commit: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    useStore.mockReturnValue(mockStore);

    wrapper = mount(MFAAuthenticator);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("validates the OTP field on input", async () => {
    const otpInput = wrapper.find("input#otp");
    otpInput.setValue("1234");
    await wrapper.vm.$nextTick();
    const errorMessage = wrapper.find("#mfaErrMsg").text();
    expect(errorMessage).toContain("OTP must be a 6-digit number");
  });

  it("submits the form on button click with valid OTP", async () => {
    const otpInput = wrapper.find("input#otp");
    otpInput.setValue("123456");
    await wrapper.vm.$nextTick();

    const form = wrapper.find("form");
    await form.trigger("submit");

    expect(mockStore.commit).toHaveBeenCalledWith("setIsMFAFromLogin", false);
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
    wrapper.find("input#otp").setValue("123456");
    await wrapper.vm.$nextTick();

    wrapper.find("form").trigger("submit");
  });

  it("does not submit the form on button click with invalid OTP", async () => {
    const wrapper = mount(MFAAuthenticator);
    wrapper.find("input#otp").setValue("");
    await wrapper.vm.$nextTick();

    wrapper.find("form").trigger("submit");
  });
});
