import { IfStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd";
import { employeeModel } from "../models/employee-form.model";
import { EmployeeService } from "../services/employee.services";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.scss"],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeList: employeeModel;
  employeeObj: employeeModel = new employeeModel();
  radioValue = "";
  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      companyId: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doj: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }
  // display all the employee info in list
  listAllEmployee() {
    this.eService.getEmployees().subscribe((res) => {
      this.employeeList = res;
    });
  }
  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log("submit", this.employeeForm.value);
      console.log(this.employeeForm.value.doj);
      this.employeeObj.name = this.employeeForm.value.name;
      this.employeeObj.email = this.employeeForm.value.email;
      this.employeeObj.companyId = this.employeeForm.value.companyId;
      this.employeeObj.gender = this.employeeForm.value.gender;
      this.employeeObj.department = this.employeeForm.value.department;
      this.employeeObj.doj = this.employeeForm.value.doj;
      this.eService.postEmployee(this.employeeObj).subscribe(
        (res) => {
          console.log(res);
          alert("Employee details added successfully!");
          this.listAllEmployee();
          this.modal.destroy();
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
