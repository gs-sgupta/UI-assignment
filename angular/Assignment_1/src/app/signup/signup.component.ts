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
  userInput!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private eService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userInput = this.fb.group({
      uemail: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSignUp(): void {
    if (this.userInput.valid) {
      this.signupCredential.username = this.userInput.value.uemail;
      this.signupCredential.password = this.userInput.value.password;
      this.signupCredential.role = "user";
      this.eService.onSignUp(this.signupCredential).subscribe(
        
        (res: any) => {
          alert("SignUp SuccessFul");
          this.userInput.reset();
          this.router.navigate(["login"]);
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
