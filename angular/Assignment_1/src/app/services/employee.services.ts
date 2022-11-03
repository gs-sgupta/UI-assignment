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
    // todo: no need of pipe and map, remove this, directly return - done
    return this.http.post<any>("http://localhost:3000/employees/", data);
  }
  getEmployees() {
    // todo: no need of pipe and map, remove this, directly return - done
    return this.http.get<any>("http://localhost:3000/employees/");
  }

  getEmployeeWithId(id: number) {
    // todo: no need of pipe and map, remove this, directly return - done
    return this.http.get<any>("http://localhost:3000/employees/" + id);
  }

  updateEmployeeWithId(data: employeeModel, id: number) {
    // todo: no need of pipe and map, remove this, directly return - done
    return this.http.put<any>("http://localhost:3000/employees/" + id, data);
  }
  deleteEmployeeWithId(id: number) {
    // todo: no need of pipe and map, remove this, directly return - done
    return this.http.delete<any>("http://localhost:3000/employees/" + id);
  }

  onSignUp(data: any) {
    // todo: no need of pipe and map, remove this, directly return- done
    return this.http.post<any>("http://localhost:3000/users", data);
  }

  onLogin(loginCredential: login) {
    const name = loginCredential.username;
    const password = loginCredential.password;
    return this.http
      .get<any>(
        `http://localhost:3000/users?username=${name}&password=${password}`
      )
  }
}
