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
    // Add similar assertions for other form fields and element
  });

  it("validates employee name field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeName");

    // Test for valid name
    await input.setValue("John Doe");
    expect(wrapper.find("#empNameErrMsg").text()).toBe("");

    // Test for invalid name
    await input.setValue("");
    expect(wrapper.find("#empNameErrMsg").text()).toContain("Name is required");
  });

  it("validates employee email field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeEmail");

    // Test for valid email
    await input.setValue("john@example.com");
    expect(wrapper.find("#empEmailErrMsg").text()).toBe("");

    // Test for invalid email
    await input.setValue("invalid-email");
    expect(wrapper.find("#empEmailErrMsg").text()).toContain(
      "Invalid email format"
    );
  });

  it("validates employee DOB field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeDOB");

    // Test for valid DOB
    await input.setValue("1990-01-01");
    expect(wrapper.find("#empDOBErrMsg").text()).toBe("");

    // Test for invalid DOB (future date)
    await input.setValue("2050-01-01");
    expect(wrapper.find("#empDOBErrMsg").text()).toContain(
      "cannot be a future date"
    );
  });

  it("validates employee designation field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeDesignation");

    // Test for valid designation
    await input.setValue("Software Engineer");
    expect(wrapper.find("#empDesgnErrMsg").text()).toBe("");

    // Test for invalid designation
    await input.setValue("");
    expect(wrapper.find("#empDesgnErrMsg").text()).toContain(
      "Designation is required"
    );
  });

  it("validates employee education field on input", async () => {
    const wrapper = mount(EmployeeDashboard);
    const input = wrapper.find("input#employeeEducation");

    // Test for valid education
    await input.setValue("Bachelor of Science");
    expect(wrapper.find("#empEduErrMsg").text()).toBe("");

    // Test for invalid education
    await input.setValue("");
    expect(wrapper.find("#empEduErrMsg").text()).toContain(
      "Education is required"
    );
  });
  it("submits the form with valid input", async () => {
    const wrapper = mount(EmployeeDashboard);

    // Set valid input for all fields
    await wrapper.find("input#employeeName").setValue("John Doe");
    // Set valid input for other fields

    await wrapper.find("form.form").trigger("submit");

    // Add assertions for form submission actions or API calls
  });

  it("does not submit the form with invalid input", async () => {
    const wrapper = mount(EmployeeDashboard);

    // Set invalid input for one or more fields
    await wrapper.find("input#employeeName").setValue("");
    // Set invalid input for other fields

    await wrapper.find("form.form").trigger("submit");
  });
  // Add assertions
});
