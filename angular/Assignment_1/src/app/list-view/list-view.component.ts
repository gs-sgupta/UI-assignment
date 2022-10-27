import { Component, OnInit } from "@angular/core";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { employeeModel } from "../models/employee-form.model";
import { EmployeeService } from "../services/employee.services";
import { NzModalService } from "ng-zorro-antd/modal"; // todo: remove unused imports
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
})
export class ListViewComponent implements OnInit {
  // handling edit form modal
  isVisible = false;
  isCancelText = null;
  pageIndex = 1;
  pageSize = 3;
  employeeList: employeeModel; // todo: it must be of type employeeModel[]
  employeeForm!: FormGroup;
  employeeObj: employeeModel = new employeeModel(); // no need of this variable

  radioValue = ""; // todo: remove unused variables
  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  // constructor
  constructor(private fb: FormBuilder, private eService: EmployeeService) {}

  ngOnInit() {
    this.displayAllEmployee();
    this.employeeForm = this.fb.group({ // todo: duplicate code, reuse employee-form.component
      editUserId: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      companyId: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doj: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }

  changeDateFormat(date: any) { // // todo: duplicate code, reuse employee-form.component and also use angular date pipe for date formatting
    // console.log(date);
    var res = new Date(date.split(".")[0] + "Z").toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return res;
  }

  // display all the employee info in list
  displayAllEmployee() {
    this.eService.getEmployees().subscribe((res) => {
      this.employeeList = res;
      for (var index in this.employeeList) { // todo: don't use var
        let day = this.changeDateFormat(this.employeeList[index].doj);
        this.employeeList[index].doj = day;
      }
    });
  }

  // delete employee info with id
  deleteEmployeeWithId(id: number) {
    this.eService.deleteEmployeeWithId(id).subscribe((res) => { // todo: unsubscribe
      this.displayAllEmployee();
    });
  }

  // open modals, when 'edit' got clicked
  showModal(editUserId: number): void {
    this.isVisible = true;
    this.eService.getEmployeeWithId(editUserId).subscribe((res) => { // todo: duplicate code, reuse employee-form.component
      this.employeeForm.controls["editUserId"].setValue(editUserId);  // todo: you can directly assign value like this.employeeForm.patchValue()
      this.employeeForm.controls["name"].setValue(res.name);
      this.employeeForm.controls["email"].setValue(res.email);
      this.employeeForm.controls["companyId"].setValue(res.companyId);
      this.employeeForm.controls["gender"].setValue(res.gender);
      this.employeeForm.controls["doj"].setValue(res.doj);
      this.employeeForm.controls["department"].setValue(res.department);
    });
  }

  handleCancel(): void {
    console.log("Button cancel clicked!"); // todo: remove console
    this.isVisible = false;
  }

  onUpdate(): void {
    var editUserId = this.employeeForm.value.editUserId; // todo: should not use var
    if (this.employeeForm.valid) {
      this.employeeObj.name = this.employeeForm.value.name;  // todo: get the value directly this.employeeForm.value
      this.employeeObj.email = this.employeeForm.value.email;
      this.employeeObj.companyId = this.employeeForm.value.companyId;
      this.employeeObj.gender = this.employeeForm.value.gender;
      this.employeeObj.department = this.employeeForm.value.department;
      this.employeeObj.doj = this.employeeForm.value.doj;
      this.eService
        .updateEmployeeWithId(this.employeeObj, editUserId)
        .subscribe(  // todo: unsubscribe
          (res) => {
            alert("Employee details updated successfully!"); // todo: use notification
            this.isVisible = false;
            this.displayAllEmployee();
          },
          (error) => {
            alert("Details not added, something went wrong"); // todo: display some error message to user
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
