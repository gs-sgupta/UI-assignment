import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  views: number = 5; // TODO: remove unused variables, and also no need to mention type when you are assigning value directly to a variable
  constructor(
    private router: Router,
    private modalService: NzModalService,
    private authService: AuthService,
    private route: ActivatedRoute // TODO: remove unused variables
  ) {}

  currUser: string = ""; // TODO: no need to mention type when you are assigning value directly to a variable

  ngOnInit() {
    this.currUser = JSON.parse( // todo: move to service
      localStorage.getItem("User Credential")
    ).username;
    // console.log("Current Logged In User :", this.currUser);
  }

  onAddEmployee(): void {
    this.modalService.create({
      nzTitle: "Add Employee",
      nzCancelText: null,
      nzOkText: null,
      nzContent: EmployeeFormComponent,
    });
  }

  onLogout() {
    this.authService.onLogout();
    alert("Logout Succesfull!");  // todo: use notification
    this.router.navigate(["login"]);
  }
}
