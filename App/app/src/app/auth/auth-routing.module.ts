import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegisterComponent } from "./register/register.component";
import { AuthActivate } from "../shared/guards/auth.activate";
import { PageNotFoundComponent } from "../core/page-not-found/page-not-found.component";

const routes: Routes = [
    {
      path: 'auth/login',
      component: LoginComponent,
      canActivate:[AuthActivate],
      data: {
        title: 'Login',
        guest: true,
      },
    },
    {
      path: 'auth/register',
      component: RegisterComponent,
      canActivate:[AuthActivate],
      data: {
        title: 'Register',
        guest: true,
  
      },
    },
    {
      path: 'auth/logout',
      component: LogoutComponent,
    },
    {
      path: '**',
      component: PageNotFoundComponent,
    },
  ];
  
  export const AuthRoutingModule = RouterModule.forChild(routes);