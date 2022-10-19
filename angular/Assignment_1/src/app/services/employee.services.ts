import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { employeeModel } from "../models/employee-form.model";
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
  updateEmployee(data: employeeModel, id: number) {
    // console.log("onupdate", data, id);
    return this.http
      .put<any>("http://localhost:3000/employees/" + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteEmployee(id: number) {
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

  onLogin(data: any) {
    return this.http.get<any>("http://localhost:3000/users").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
