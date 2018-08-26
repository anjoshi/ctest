import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
        <!--<span><a [routerLink]="['/']">Home</a></span>-->
        <!--<span><a [routerLink]="['/login']">Login</a></span>-->
        <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngcomcastui';
}
