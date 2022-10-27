import { invalid } from "@angular/compiler/src/render3/view/util"; // TODO: remove unused imports
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { login } from "../models/login.model";
import { AuthService } from "../services/auth.service";
import { EmployeeService } from "../services/employee.services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  userInput!: FormGroup;
  loginCredential: login = new login(); // TODO: no need of this variable

  constructor(
    private fb: FormBuilder,
    private eService: EmployeeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userInput = this.fb.group({
      uemail: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  onLogin(): void {
    if (this.userInput.valid) {
      this.loginCredential.username = this.userInput.value.uemail; // TODO: use a local variable like const or let instead of this.loginCredential
      this.loginCredential.password = this.userInput.value.password;
      // doubt why after observable subscribe any statement is not executed
      // TODO: not clear with above doubt
      this.eService.onLogin(this.loginCredential).subscribe( // TODO: do unsubscription
        (res) => {
          if (
            res.length &&
            this.loginCredential.username === res[0].username &&
            this.loginCredential.password === res[0].password
          ) {
            this.authService.onlogin();
            alert("Login Successful"); // TODO: remove alerts an use notification growl component in nz-zorro
            this.userInput.reset();
            localStorage.setItem(  // TODO: don't use localstorage directly in components, use services instead
              "User Credential",
              JSON.stringify(this.loginCredential)
            );
            this.router.navigate(["home"]);
          } else {
            alert("invalid credentials"); // TODO: use notification
          }
        },
        (error: any) => {
          console.log(error); // TODO: display some error message to user when it is failed
        }
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
}
