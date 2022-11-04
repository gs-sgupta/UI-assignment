import { Component, OnInit } from "@angular/core";
import { employeeModel } from "../models/employee-form.model";
import { EmployeeService } from "../services/employee.services";
// todo: remove unused imports - done
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
})
export class ListViewComponent implements OnInit {
  pageIndex = 1;
  pageSize = 2;
  isVisible = false;
  isCancelText = null;
  subscriptionsArray: Subscription[] = [];
  employeeList: employeeModel[]; // todo: it must be of type employeeModel[] - done

  page: number = 1;
  editEmployeeId: number;
  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" }, // todo: reuse employee-form.component - done
  ];

  constructor(
    private fb: FormBuilder,
    private eService: EmployeeService,
    private notification: NzNotificationService,
  ) {}

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  ngOnInit() {
    this.displayAllEmployee();
  }

  displayAllEmployee() {
    this.subscriptionsArray.push(
      this.eService.getEmployees().subscribe((res) => {
        // todo: unsubscribe - done
        this.employeeList = res;
      })
    );
  }
  deleteEmployeeWithId(id: number) {
    this.subscriptionsArray.push(
      this.eService.deleteEmployeeWithId(id).subscribe((res) => {
        this.displayAllEmployee();
      })
    );
  }

  showModal(editUserId: number): void {
    this.editEmployeeId = editUserId;
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
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
