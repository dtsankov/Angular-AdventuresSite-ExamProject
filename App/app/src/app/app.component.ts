import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.services';
import { getSession } from './shared/session/session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http:HttpClient,private authService: AuthService){
    if(!getSession()){
      this.authService.setLoginInfo(null,false)
      return
    }
    this.authService.setLoginInfo(getSession(),true)
  }
}
