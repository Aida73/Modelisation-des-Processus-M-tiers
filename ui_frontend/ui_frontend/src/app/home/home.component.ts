import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public isLoggedIn = false;
  public userProfile : KeycloakProfile | null = null;


  constructor(private readonly keycloak: KeycloakService, private router: Router){}

  async ngOnInit() {

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if(this.isLoggedIn){

      this.userProfile = await this.keycloak.loadUserProfile();

      //this.router.navigate(['/rd'])

      if(this.keycloak.getUserRoles().includes('customer')){
        this.router.navigate(["/client"]);
      }
      else if(this.keycloak.getUserRoles().includes('provider')){
        this.router.navigate(["/provider"]);
      }
      else{
        alert("l'utilisateur n'a aucun des rôles");
      }

    }
    
  }

  public login(){
    this.keycloak.login();
  }

  public logout(){
    this.keycloak.logout();
  }

}
