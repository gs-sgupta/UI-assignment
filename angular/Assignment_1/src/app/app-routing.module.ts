import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardViewComponent } from "./card-view/card-view.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { HomeComponent } from "./home/home.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuardService } from "./services/auth-gaurd.service";
import { SignupComponent } from "./signup/signup.component";


const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "home/:name",
    component: HomeComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: "card-view", component: CardViewComponent },
      { path: "list-view", component: ListViewComponent },
    ],
  },
  { path: "employee-form", component: EmployeeFormComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
