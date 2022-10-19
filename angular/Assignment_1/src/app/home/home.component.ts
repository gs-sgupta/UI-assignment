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
  views: number = 5;
  constructor(
    private router: Router,
    private modalService: NzModalService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  currUser: string = "";

  ngOnInit() {
    this.currUser = this.route.snapshot.params["name"];
    console.log(this.currUser);
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
    this.authService.logout();
    alert("Logout Succesfull!");
    this.router.navigate(["login"]);
  }
}
