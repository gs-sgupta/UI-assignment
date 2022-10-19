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
  validateForm!: FormGroup;
  loginCredential: login = new login();

  constructor(
    private fb: FormBuilder,
    private eService: EmployeeService,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      uemail: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.validateForm.valid) {
      this.loginCredential.username = this.validateForm.value.uemail;
      this.loginCredential.password = this.validateForm.value.password;
      this.eService.onLogin(this.loginCredential).subscribe((res) => {
        const isUserPresent = res.find((check: login) => {
          return (
            check.username === this.loginCredential.username &&
            check.password === this.loginCredential.password
          );
        });
        if (isUserPresent) {
          alert("Login Successful");
          this.authService.login();
          this.validateForm.reset();
          const currUsername = this.loginCredential.username;
          this.router.navigate(["home",currUsername]);
        } else {
          alert("Invalid Credentials");
        }
      });
      console.log("submit", this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
