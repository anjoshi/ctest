import { Component, OnInit } from '@angular/core';
import { LoginService} from "../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.loginService.varifyCredential(formData.username, formData.password)
      .then((data) => {
        this.router.navigate(['home']);
      })
      .catch((err) => {
        //this.errorAlert('Login Failure. Incorrect Password.');
      })
  }



}
