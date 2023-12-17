import AppLogin from "../views/AppLogin.vue";
import AppSignup from "../views/AppSignup.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import MFAAuthenticator from "../views/MFAAuthenticator.vue";

const authRoutes = [
  { path: "/", component: AppLogin },
  { path: "/login", component: AppLogin },
  { path: "/signup", component: AppSignup },
  { path: "/mfa-verify", component: MFAAuthenticator },
  { path: "/forgot-pass", component: ForgotPassword },
  { path: "/reset-password", component: ResetPassword },
  { path: "/reset-password/:token", component: ResetPassword },
];

export default authRoutes;
