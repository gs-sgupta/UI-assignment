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
  employeeList: employeeModel; // todo: it must be of type employeeModel[]
  employeeForm!: FormGroup;
  employeeObj: employeeModel = new employeeModel(); // todo: no need f this
  page: number = 1;
  radioValue = ""; // todo: remove this
  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" }, // todo: reuse employee-form.component
  ];

  constructor(private fb: FormBuilder, private eService: EmployeeService) {}

  ngOnInit() {
    this.displayAllEmployee();
    this.employeeForm = this.fb.group({ // todo: reuse employee-form.component
      editUserId: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      companyId: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doj: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }

  changeDateFormat(date: any) { // todo: use angular date pipe instead of this
    // console.log(date);
    var res = new Date(date.split(".")[0] + "Z").toLocaleDateString('en-US', { // todo: should not use var
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return res;
  }
  displayAllEmployee() {
    this.eService.getEmployees().subscribe((res) => { // todo: unsubscribe
      this.employeeList = res;
      for (var index in this.employeeList) { // todo: don't use var
        let day = this.changeDateFormat(this.employeeList[index].doj); // todo: use angular date pipe instead of this
        this.employeeList[index].doj = day;
      }
    });
  }
  deleteEmployeeWithId(id: number) {
    this.eService.deleteEmployeeWithId(id).subscribe((res) => { // todo: unsubscribe
      this.displayAllEmployee();
    });
  }

  // open modals, when 'edit' got clicked
  showModal(editUserId: number): void {
    this.isVisible = true;
    this.eService.getEmployeeWithId(editUserId).subscribe((res) => {  // todo: duplicate code, reuse employee-form.component
      this.employeeForm.controls["editUserId"].setValue(editUserId); // todo: you can directly assign value like this.employeeForm.patchValue()
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
    console.log(editUserId); // todo: remove console
    if (this.employeeForm.valid) {
      this.employeeObj.name = this.employeeForm.value.name; // todo: get the value directly this.employeeForm.value
      this.employeeObj.email = this.employeeForm.value.email;
      this.employeeObj.companyId = this.employeeForm.value.companyId;
      this.employeeObj.gender = this.employeeForm.value.gender;
      this.employeeObj.department = this.employeeForm.value.department;
      this.employeeObj.doj = this.employeeForm.value.doj;
      this.eService
        .updateEmployeeWithId(this.employeeObj, editUserId)
        .subscribe( // todo: unsubscribe
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
