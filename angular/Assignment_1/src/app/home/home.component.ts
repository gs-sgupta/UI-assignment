import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  currUser = ""; // TODO: no need to mention type when you are assigning value directly to a variable - done
  isVisible = false;
  isAddEmployee = false;
  ngOnInit() {
    // todo: move to service - done
    this.currUser = this.authService.getLoginUserName();
  }

  onAddEmployee(): void {
    this.isVisible = true;
    this.isAddEmployee = true;
  }
  handleCancel(): void {
    this.isVisible = false;
    this.isAddEmployee = false;
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  onLogout() {
    this.authService.onLogout();
    // todo: use notification - done
    this.createNotification("success", "Logout", "LogoutSuccessful");
    this.router.navigate(["login"]);
  }
}
