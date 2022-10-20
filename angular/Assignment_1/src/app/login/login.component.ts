import { invalid } from "@angular/compiler/src/render3/view/util";
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
  loginCredential: login = new login();

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
      this.loginCredential.username = this.userInput.value.uemail;
      this.loginCredential.password = this.userInput.value.password;
      // doubt why after observable subscribe any statement is not executed
      this.eService.onLogin(this.loginCredential).subscribe(
        (res) => {
          if (
            res.length &&
            this.loginCredential.username === res[0].username &&
            this.loginCredential.password === res[0].password
          ) {
            this.authService.onlogin();
            alert("Login Successful");
            this.userInput.reset();
            localStorage.setItem(
              "User Credential",
              JSON.stringify(this.loginCredential)
            );
            this.router.navigate(["home"]);
          } else {
            alert("invalid credentials");
          }
        },
        (error: any) => {
          console.log(error);
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
