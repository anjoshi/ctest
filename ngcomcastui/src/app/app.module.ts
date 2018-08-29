import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { FormsModule } from "@angular/forms";
import 'rxjs/add/operator/do';

import { HttpModule } from '@angular/http'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from "./services/login.service";
import { Routing } from "./app.routing";
import { SeedService } from "./services/seed.service";
import { SeedComponent } from './seed/seed.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeedComponent,
  ],
  imports: [
    BrowserModule,
    Routing,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoginService,
    SeedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
