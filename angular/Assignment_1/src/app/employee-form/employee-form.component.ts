import { IfStmt } from "@angular/compiler"; // todo: remove this
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
  employeeObj: employeeModel = new employeeModel(); // todo: no need of this variable
  radioValue = ""; // todo: remove this
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
    this.eService.getEmployees().subscribe((res) => { // todo: do unsubscribe
      this.employeeList = res;
    });
  }
  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeObj.name = this.employeeForm.value.name; // todo: use local variable and also you can directly get the whole object using this.employeeForm.value
      this.employeeObj.email = this.employeeForm.value.email;
      this.employeeObj.companyId = this.employeeForm.value.companyId;
      this.employeeObj.gender = this.employeeForm.value.gender;
      this.employeeObj.department = this.employeeForm.value.department;
      this.employeeObj.doj = this.employeeForm.value.doj;
      this.eService.postEmployee(this.employeeObj).subscribe( // todo: unsubscribe
        (res) => {
          console.log(res);
          alert("Employee details added successfully!"); // todo: use notification
          this.listAllEmployee();
          this.modal.destroy();
        },
        (error) => {
          alert("Details not added, something went wrong"); // todo: display error message to user
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
