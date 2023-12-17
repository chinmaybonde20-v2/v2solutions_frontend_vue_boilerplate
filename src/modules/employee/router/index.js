import EmployeeForm from "../views/EmployeeForm.vue";

const empRoutes = [
  {
    path: "/emp-manager",
    component: EmployeeForm,
    meta: { requiresAuth: true },
  },
];

export default empRoutes;
