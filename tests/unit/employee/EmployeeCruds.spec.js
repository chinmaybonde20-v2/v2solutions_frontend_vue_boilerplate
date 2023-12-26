import { mount } from "@vue/test-utils";
import EmployeeDashboard from "@/modules/employee/views/EmployeeForm.vue";
describe("EmployeeDashboard", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(EmployeeDashboard);
  });

  it("renders employee form correctly", () => {
    expect(wrapper.find(".form-container").exists()).toBe(true);
    expect(wrapper.find("form.form").exists()).toBe(true);
    expect(wrapper.find("input#employeeName").exists()).toBe(true);
    expect(wrapper.find("input#employeeEmail").exists()).toBe(true);
    expect(wrapper.find("input#employeeDOB").exists()).toBe(true);
    expect(wrapper.find("input#employeeDesignation").exists()).toBe(true);
    expect(wrapper.find("input#employeeEducation").exists()).toBe(true);
  });

  it("validates employee name field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeName");

    await input.setValue("Chinmay Bonde");
    expect(wrapper.find("#empNameErrMsg").text()).toBe("");

    await input.setValue("");
    expect(wrapper.find("#empNameErrMsg").text()).toContain("Name is required");
  });

  it("validates employee email field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeEmail");

    await input.setValue("chinmaybonde@gmail.com");
    expect(wrapper.find("#empEmailErrMsg").text()).toBe("");

    await input.setValue("invalid-email");
    expect(wrapper.find("#empEmailErrMsg").text()).toContain(
      "Invalid email format"
    );
  });

  it("validates employee DOB field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeDOB");

    await input.setValue("1990-01-01");
    expect(wrapper.find("#empDOBErrMsg").text()).toBe("");

    await input.setValue("2050-01-01");
    expect(wrapper.find("#empDOBErrMsg").text()).toContain(
      "cannot be a future date"
    );
  });

  it("validates employee designation field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeDesignation");

    await input.setValue("Software Engineer");
    expect(wrapper.find("#empDesgnErrMsg").text()).toBe("");

    await input.setValue("");
    expect(wrapper.find("#empDesgnErrMsg").text()).toContain(
      "Designation is required"
    );
  });

  it("validates employee education field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeEducation");

    await input.setValue("Bachelor of Science");
    expect(wrapper.find("#empEduErrMsg").text()).toBe("");

    await input.setValue("");
    expect(wrapper.find("#empEduErrMsg").text()).toContain(
      "Education is required"
    );
  });
  it("submits the form with valid input", async () => {
    const wrapper = mount(EmployeeDashboard);

    await wrapper.find("input#employeeName").setValue("John Doe");

    await wrapper.find("form.form").trigger("submit");
  });

  it("does not submit the form with invalid input", async () => {
    const wrapper = mount(EmployeeDashboard);

    await wrapper.find("input#employeeName").setValue("");

    await wrapper.find("form.form").trigger("submit");
  });
});
