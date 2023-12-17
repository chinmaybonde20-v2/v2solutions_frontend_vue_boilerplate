import { mount } from "@vue/test-utils";
import EmployeeForm from "@/modules/employee/views/EmployeeForm.vue";

describe("Employee Dashboard", () => {
  it("renders the form correctly", () => {
    const wrapper = mount(EmployeeForm);
    expect(wrapper.find(".form-container").exists()).toBe(true);
    expect(wrapper.find("form.form-focus").exists()).toBe(true);
    expect(wrapper.find("button.btn-primary").text()).toBe("Add Employee");
  });

  it("validates the employee name field on input", async () => {
    const wrapper = mount(EmployeeForm);

    // Valid name input
    wrapper.find("#employeeName").setValue("Chinmay Bonde");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toBe("");

    // Invalid name input
    wrapper.find("#employeeName").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toContain("Name is required");
  });

  it("validates the employee email field on input", async () => {
    const wrapper = mount(EmployeeForm);

    // Valid email input
    wrapper.find("#employeeEmail").setValue("chinmaybonde20@gmail.com");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toBe("");

    // Invalid email input
    wrapper.find("#employeeEmail").setValue("invalid-email");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toContain(
      "Invalid email format"
    );
  });

  it("validates the employee date of birth field on input", async () => {
    const wrapper = mount(EmployeeForm);

    // Valid date of birth input
    wrapper.find("#employeeDOB").setValue("20-02-1999");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toBe("");

    // Invalid date of birth input (too young)
    wrapper.find("#employeeDOB").setValue("20-02-2023");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toContain(
      "Must be at least 18 years old"
    );
  });

  it("validates the employee designation field on input", async () => {
    const wrapper = mount(EmployeeForm);

    // Valid designation input
    wrapper.find("#employeeDesignation").setValue("Software Engineer");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toBe("");

    // Invalid designation input
    wrapper.find("#employeeDesignation").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toContain(
      "Designation is required"
    );
  });

  it("validates the employee education field on input", async () => {
    const wrapper = mount(EmployeeForm);

    // Valid education input
    wrapper
      .find("#employeeEducation")
      .setValue("Bachelor's in Computer Science");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toBe("");

    // Invalid education input
    wrapper.find("#employeeEducation").setValue("");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".text-danger").text()).toContain(
      "Education is required"
    );
  });
});
