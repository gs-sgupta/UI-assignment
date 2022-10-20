import { Injectable } from "@angular/core";
import { login } from "../models/login.model";
import { EmployeeService } from "./employee.services";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn = false;

  constructor(private eService: EmployeeService) {
    this.fetchLogin();
  }
  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  fetchLogin() {
    const check = JSON.parse(localStorage.getItem("User Credential"));
    if (check) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  onlogin() {
    this.loggedIn = true;
  }

  onLogout() {
    this.loggedIn = false;
    localStorage.removeItem("User Credential");
  }
}
