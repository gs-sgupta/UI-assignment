import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Subscription } from "rxjs";
import { signup } from "../models/signup.model";
import { EmployeeService } from "../services/employee.services";
@Component({
  selector: "app-registration-form",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  userInput!: FormGroup;
  subscriptionsArray: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private eService: EmployeeService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.userInput = this.fb.group({
      uemail: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  onSignUp(): void {
    if (this.userInput.valid) {
      // TODO: use a local variable like const or let instead of this.signupCredential - done
      let signupCredential: signup;
      signupCredential = {
        username: this.userInput.value.uemail,
        password: this.userInput.value.password,
        role: "user",
      };

      this.subscriptionsArray.push(
        this.eService.onSignUp(signupCredential).subscribe(
          // TODO: do unsubscription - done

          (res: any) => {
            // TODO: remove alerts an use notification growl component in nz-zorro - done
            this.createNotification("success", "Login", "Login Successful");
            this.userInput.reset();
            this.router.navigate(["login"]);
          },
          (error: any) => {
            // TODO: display some error message to user when it is failed - done
            this.createNotification("error", "Error", error);
          }
        )
      );
    } else {
      Object.values(this.userInput.controls).forEach((control) => {
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
