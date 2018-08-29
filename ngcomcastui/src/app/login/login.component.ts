import { Component, OnInit } from '@angular/core';
import { LoginService} from "../services/login.service";
import { Router } from "@angular/router";
import { AlertsService } from "../services/alerts.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  private message = '';
  constructor(private loginService: LoginService, private router: Router, private alertService: AlertsService) { }
  ngOnInit() {
  }

  onSubmit(formData) {
    this.loginService.varifyCredential(formData.username, formData.password)
      .then((data) => {
        this.router.navigate(['home']);
      })
      .catch((err) => {
        console.error(err);
        this.errorAlert('Login Failure. Incorrect Password.');
      })
  }
  errorAlert(message: string, keepAfterRouteChange = false) {
    this.alertService.error(message, keepAfterRouteChange);
    this.message = "";
  }
}
