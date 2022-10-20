import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { signup } from "../models/signup.model";
import { EmployeeService } from "../services/employee.services";
@Component({
  selector: "app-registration-form",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupCredential: signup = new signup();
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private eService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      uemail: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSignUp(): void {
    if (this.validateForm.valid) {
      this.signupCredential.username = this.validateForm.value.uemail;
      this.signupCredential.password = this.validateForm.value.password;
      this.signupCredential.role = "user";
      this.eService.onSignUp(this.signupCredential).subscribe(
        (res: any) => {
          alert("SignUp SuccessFul");
          this.validateForm.reset();
          this.router.navigate(["login"]);
        },
        (error: any) => {
          console.log(error);
        }
      );

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
//   log(value: object[]): void {
//     console.log(value);
//   }
// this.eService.getUsers(this.signupCredential).subscribe((res) => {
//   const isUserAlreadyPresent = res.find((check: signup) => {
//     return check.username === this.signupCredential.username;
//   });
//   console.log(isUserAlreadyPresent);
//   if (!isUserAlreadyPresent) {
