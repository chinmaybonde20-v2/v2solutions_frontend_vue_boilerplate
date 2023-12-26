import { mount } from "@vue/test-utils";
import HomePage from "@/views/HomePage.vue";
import { createStore } from "vuex";

describe("HomePage", () => {
  it("renders the HomePage message when user is not logged in", () => {
    const store = createStore({
      state: {
        isLoggedIn: false,
      },
    });

    const wrapper = mount(HomePage, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find("h1").text()).toBe(
      "Welcome to V2Solutions Vue.js Boilerplate"
    );
    expect(wrapper.find("h2").exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("Please login first");
  });

  it("does not render the HomePage message when user is logged in", () => {
    const store = createStore({
      state: {
        isLoggedIn: true,
      },
    });

    const wrapper = mount(HomePage, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find("h1").text()).toBe(
      "Welcome to V2Solutions Vue.js Boilerplate"
    );
    expect(wrapper.find("h2").exists()).toBe(false);
  });
});
