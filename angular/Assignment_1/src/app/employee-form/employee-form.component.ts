import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Subscription } from "rxjs/internal/Subscription";
import { employeeModel } from "../models/employee-form.model";
import { EmployeeService } from "../services/employee.services";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.scss"],
})
export class EmployeeFormComponent implements OnInit {
  @Input() editEmployeeId: number;
  @Input() isAddEmployee: boolean;
  subscriptionsArray: Subscription[] = [];
  employeeList: employeeModel[]; // todo: it must be of type employeeModel[] - done
  employeeForm!: FormGroup;
  page: number = 1;
  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" }, // todo: reuse employee-form.component - done
  ];
  constructor(
    private fb: FormBuilder,
    private eService: EmployeeService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.displayAllEmployee();
    this.employeeForm = this.fb.group({
      // todo: reuse employee-form.component - done
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      companyId: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doj: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
    this.subscriptionsArray.push(
      this.eService.getEmployeeWithId(this.editEmployeeId).subscribe((res) => {
        // todo: you can directly assign value like this.employeeForm.patchValue() - done
        this.employeeForm.patchValue(res);
      })
    );
  }

  displayAllEmployee() {
    this.subscriptionsArray.push(
      this.eService.getEmployees().subscribe((res) => {
        // todo: unsubscribe - done
        this.employeeList = res;
        // todo: use angular date pipe instead of this - done
      })
    );
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  onSubmit(): void {
    // todo: remove console - done
    // todo: should not use var - done
    const editUserId = this.employeeForm.value.id;

    if (this.employeeForm.valid) {
      // todo: get the value directly this.employeeForm.value - done
      let employeeObj: employeeModel;
      employeeObj = this.employeeForm.value;
      if (this.isAddEmployee) {
        this.subscriptionsArray.push(
          this.eService.postEmployee(employeeObj).subscribe(
            // todo: unsubscribe - done
            (res) => {
              // todo: use notification - done
              this.createNotification(
                "success",
                "Successful",
                "Employee Added Successful"
              );
              // this.listAllEmployee();
            },
            (error) => {
              // todo: display error message to user - done
              this.createNotification("error", "Error", error);
            }
          )
        );
      } else {
        this.subscriptionsArray.push(
          this.eService.updateEmployeeWithId(employeeObj, editUserId).subscribe(
            // todo: unsubscribe - done
            (res) => {
              // todo: use notification - done
              this.displayAllEmployee();
              this.createNotification(
                "success",
                "Updated",
                "Employee Update Successful"
              );
            },
            (error) => {
              // todo: display some error message to user - done
              this.createNotification("error", "Error", error);
            }
          )
        );
      }
    } else {
      Object.values(this.employeeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionsArray && this.subscriptionsArray.length) {
      this.subscriptionsArray.forEach((subs: Subscription) => {
        if (subs) {
          subs.unsubscribe();
        }
      });
    }
  }
}
