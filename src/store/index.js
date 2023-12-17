import { createStore } from "vuex";

export default createStore({
  state: {
    jwtToken: localStorage.getItem("jwtToken") || null,
    isLoggedIn: !localStorage.getItem("jwtToken") ? false : true,
    email: "",
    isMFAFromLogin: false,
  },
  mutations: {
    setToken(state, jwtToken) {
      state.jwtToken = jwtToken;
      localStorage.setItem("jwtToken", jwtToken);
    },
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setIsMFAFromLogin(state, value) {
      state.isMFAFromLogin = value;
    },
  },
});
