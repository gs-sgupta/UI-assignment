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
      const isUserPresent = this.eService
        .onLogin(this.loginCredential)
        .subscribe(
          (res) => {
            return (
              this.loginCredential.username === res.username &&
              this.loginCredential.password === res.password
            );
          },
          (error: any) => {
            console.log(error);
          }
        );
      if (isUserPresent) {
        this.authService.onlogin();
        alert("Login Successful");
        this.userInput.reset();
        localStorage.setItem(
          "User Credential",
          JSON.stringify(this.loginCredential)
        );
        this.router.navigate(["home"]);
      }
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
