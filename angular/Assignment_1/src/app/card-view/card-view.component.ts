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

  changeDateFormat(date: any) {
    // console.log(date);
    var res = new Date(date.split(".")[0] + "Z").toLocaleDateString('en-US', {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return res;
  }
  displayAllEmployee() {
    this.eService.getEmployees().subscribe((res) => {
      this.employeeList = res;
      for (var index in this.employeeList) {
        let day = this.changeDateFormat(this.employeeList[index].doj);
        this.employeeList[index].doj = day;
      }
    });
  }
  deleteEmployeeWithId(id: number) {
    this.eService.deleteEmployeeWithId(id).subscribe((res) => {
      this.displayAllEmployee();
    });
  }

  // open modals, when 'edit' got clicked
  showModal(editUserId: number): void {
    this.isVisible = true;
    this.eService.getEmployeeWithId(editUserId).subscribe((res) => {
      this.employeeForm.controls["editUserId"].setValue(editUserId);
      this.employeeForm.controls["name"].setValue(res.name);
      this.employeeForm.controls["email"].setValue(res.email);
      this.employeeForm.controls["companyId"].setValue(res.companyId);
      this.employeeForm.controls["gender"].setValue(res.gender);
      this.employeeForm.controls["doj"].setValue(res.doj);
      this.employeeForm.controls["department"].setValue(res.department);
    });
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
      this.eService
        .updateEmployeeWithId(this.employeeObj, editUserId)
        .subscribe(
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
