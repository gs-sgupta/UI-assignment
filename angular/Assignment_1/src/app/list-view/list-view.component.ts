import { Component, OnInit } from "@angular/core";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { employeeModel } from "../models/employee-form.model";
import { EmployeeService } from "../services/employee.services";
import { NzModalService } from "ng-zorro-antd/modal";
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
  employeeList: employeeModel;
  employeeForm!: FormGroup;
  employeeObj: employeeModel = new employeeModel();

  radioValue = "";
  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  // constructor
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

  changeDateFormat(date: any) {
    var tp = JSON.stringify(date).slice(1, 11);
    const [year, month, day] = tp.split("-");
    const res = [month, +day + 1 === 32 ? 31 : +day + 1, year].join("/");
    // console.log("change data format function", res);
    return res;
  }

  // display all the employee info in list
  displayAllEmployee() {
    this.eService.getEmployees().subscribe((res) => {
      this.employeeList = res;
      for (var index in this.employeeList) {
        // console.log(
        //   "display all employee function",
        //   this.employeeList[index].doj
        // );
        let day = this.changeDateFormat(this.employeeList[index].doj);
        this.employeeList[index].doj = day;
      }
    });
  }

  // delete employee info with id
  deleteEmployeeWithId(id: number) {
    this.eService.deleteEmployee(id).subscribe((res) => {
      this.displayAllEmployee();
    });
  }

  // open modals, when 'edit' got clicked
  showModal(data: employeeModel, editUserId: number): void {
    // console.log(editUserId);
    // console.log(
    //   "show modal employeeForm,employeeObj",
    //   editUserId,
    //   this.employeeForm.value.doj,
    //   data.doj
    // );
    this.isVisible = true;
    this.employeeForm.controls["editUserId"].setValue(editUserId);
    this.employeeForm.controls["name"].setValue(data.name);
    this.employeeForm.controls["email"].setValue(data.email);
    this.employeeForm.controls["companyId"].setValue(data.companyId);
    this.employeeForm.controls["gender"].setValue(data.gender);
    this.employeeForm.controls["doj"].setValue(data.doj);
    this.employeeForm.controls["department"].setValue(data.department);

    // console.log(this.employeeForm.value);
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
      this.employeeObj.doj = this.employeeForm.value.doj;
      this.eService.updateEmployee(this.employeeObj, editUserId).subscribe(
        (res) => {
          alert("Employee details updated successfully!");
          this.isVisible = false;
        },
        (error) => {
          alert("Details not added, something went wrong");
        }
      );
      // this.displayAllEmployee();
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
