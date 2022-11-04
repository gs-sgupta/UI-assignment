import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgZorroAntdModule, NZ_I18N, en_US, NzFormModule } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { CardViewComponent } from "./card-view/card-view.component";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { ListViewComponent } from "./list-view/list-view.component";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NgxPaginationModule } from "ngx-pagination";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CardViewComponent,
    LoginComponent,
    ListViewComponent,
    SignupComponent,
    HomeComponent,
    PageNotFoundComponent,
    EmployeeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzFormModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    NzLayoutModule,
    NgxPaginationModule,
    NzPaginationModule,
    NzDatePickerModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
