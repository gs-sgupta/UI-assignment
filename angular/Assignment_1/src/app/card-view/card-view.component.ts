import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { employeeModel } from "../models/employee-form.model";
import { EmployeeService } from "../services/employee.services";

@Component({
  selector: "app-card-view",
  templateUrl: "./card-view.component.html",
  styleUrls: ["./card-view.component.scss"],
})
export class CardViewComponent implements OnInit {
  isVisible = false;
  isCancelText = null;
  employeeList: employeeModel;
  employeeForm!: FormGroup;
  employeeObj: employeeModel = new employeeModel();
  page: number = 1;
  radioValue = "";
  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  constructor(private fb: FormBuilder, private eService: EmployeeService) {}

  ngOnInit() {
    this.displayAllEmployee();
    this.employeeForm = this.fb.group({
      editUserId: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      companyId: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doj: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }

  displayAllEmployee() {
    this.eService.getEmployees().subscribe((res) => {
      // console.log(res);
      this.employeeList = res;
    });
  }
  deleteEmployeeWithId(id: number) {
    this.eService.deleteEmployee(id).subscribe((res) => {
      this.displayAllEmployee();
    });
  }

  // open modals, when 'edit' got clicked
  showModal(data: employeeModel, editUserId: number): void {
    // console.log(editUserId);
    this.isVisible = true;
    this.employeeForm.controls["editUserId"].setValue(editUserId);
    this.employeeForm.controls["name"].setValue(data.name);
    this.employeeForm.controls["email"].setValue(data.email);
    this.employeeForm.controls["companyId"].setValue(data.companyId);
    this.employeeForm.controls["gender"].setValue(data.gender);
    this.employeeForm.controls["doj"].setValue(data.doj);
    this.employeeForm.controls["department"].setValue(data.department);
    console.log(this.employeeForm.value);
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  onUpdate(): void {
    var editUserId = this.employeeForm.value.editUserId;
    console.log(editUserId);
    if (this.employeeForm.valid) {
      this.employeeObj.name = this.employeeForm.value.name;
      this.employeeObj.email = this.employeeForm.value.email;
      this.employeeObj.companyId = this.employeeForm.value.companyId;
      this.employeeObj.gender = this.employeeForm.value.gender;
      this.employeeObj.department = this.employeeForm.value.department;
      var date = JSON.stringify(this.employeeForm.value.doj).slice(1, 11);
      const [year, month, day] = date.split("-");
      this.employeeObj.doj = [month, +day + 1, year].join("/");
      this.eService.updateEmployee(this.employeeObj, editUserId).subscribe(
        (res) => {
          alert("Employee details updated successfully!");
          this.isVisible = false;
          this.displayAllEmployee();
        },
        (error) => {
          alert("Details not added, something went wrong");
        }
      );
    } else {
      Object.values(this.employeeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
