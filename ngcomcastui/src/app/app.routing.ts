
import { Routes, RouterModule} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SeedComponent } from "./seed/seed.component";

const route: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: SeedComponent}
];
export const Routing = RouterModule.forRoot(route);