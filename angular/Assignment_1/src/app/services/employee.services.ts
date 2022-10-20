import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { employeeModel } from "../models/employee-form.model";
import { login } from "../models/login.model";
@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http.post<any>("http://localhost:3000/employees/", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getEmployees() {
    return this.http.get<any>("http://localhost:3000/employees/").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getEmployeeWithId(id: number) {
    return this.http.get<any>("http://localhost:3000/employees/" + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateEmployeeWithId(data: employeeModel, id: number) {
    // console.log("onupdate", data, id);
    return this.http
      .put<any>("http://localhost:3000/employees/" + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteEmployeeWithId(id: number) {
    return this.http.delete<any>("http://localhost:3000/employees/" + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  onSignUp(data: any) {
    return this.http.post<any>("http://localhost:3000/users", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  onLogin(loginCredential: login) {
    const name = loginCredential.username;
    const password = loginCredential.password;
    return this.http
      .get<any>(
        `http://localhost:3000/users?username=${name}&password=${password}`
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
