import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { login } from "../models/login.model";
import { AuthService } from "../services/auth.service";
import { EmployeeService } from "../services/employee.services";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  userInput!: FormGroup;
  subscriptionsArray: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private eService: EmployeeService,
    private router: Router,
    private authService: AuthService,
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
  onLogin(): void {
    if (this.userInput.valid) {
      let loginCredential: login;
      // TODO: use a local variable like const or let instead of this.loginCredential - done
      loginCredential = {
        username: this.userInput.value.uemail,
        password: this.userInput.value.password,
      };
      // doubt why after observable subscribe any statement is not executed
      // TODO: not clear with above doubt
      this.subscriptionsArray.push(
        this.eService.onLogin(loginCredential).subscribe(
          // TODO: do unsubscription - done
          (res) => {
            if (
              res.length &&
              loginCredential.username === res[0].username &&
              loginCredential.password === res[0].password
            ) {
              this.authService.onlogin(loginCredential);
              // TODO: remove alerts an use notification growl component in nz-zorro - done
              this.createNotification("success", "Login", "Login Successful");
              this.userInput.reset();
              // TODO: don't use localstorage directly in components, use services instead - done
              this.router.navigate(["home"]);
            } else {
              // TODO: use notification - done
              this.createNotification(
                "warning",
                "Warning",
                "Invalid Credentials"
              );
            }
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
