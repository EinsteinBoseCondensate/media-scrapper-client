
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
 
   constructor(public readonly auth0Service: AuthService){}
    
  ngOnInit(): void {
  }
  login(){
    this.auth0Service.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
  }

  logout(){
    this.auth0Service.logout()
  }
}
