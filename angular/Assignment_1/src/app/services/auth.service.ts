import { Injectable } from "@angular/core";
import { login } from "../models/login.model";
import { EmployeeService } from "./employee.services";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn = false;

  constructor() {
    // todo: remove eService here - done
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

  onlogin(loginCredential: login) {
    this.loggedIn = true;
    localStorage.setItem("User Credential", JSON.stringify(loginCredential));
  }

  onLogout() {
    this.loggedIn = false;
    localStorage.removeItem("User Credential");
  }

  getLoginUserName(): string {
    return JSON.parse(
      localStorage.getItem("User Credential")
    ).username;
  }
}
