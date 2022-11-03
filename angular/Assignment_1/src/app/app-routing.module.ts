import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardViewComponent } from "./card-view/card-view.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { HomeComponent } from "./home/home.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuardService } from "./services/auth-gaurd.service";
import { LoginGaurdService } from "./services/login-gaurd.service";
import { SignupComponent } from "./signup/signup.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    canActivate: [LoginGaurdService],
    component: LoginComponent,
  },
  {
    path: "signup",
    canActivate: [LoginGaurdService],
    component: SignupComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "card-view", component: CardViewComponent },
      { path: "list-view", component: ListViewComponent },
       // TODO: must have list view by default - done
      { path: "", redirectTo: "list-view", pathMatch: "full" },
    ],
  },
  { path: "employee-form", component: EmployeeFormComponent},
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
