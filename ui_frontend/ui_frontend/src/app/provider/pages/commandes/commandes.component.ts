import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit{

  public isLoggedIn = false;
  public userProfile : KeycloakProfile | null = null;


  constructor(private keycloak: KeycloakService){}

  async ngOnInit() {

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if(this.isLoggedIn){
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    
  }

  logout() {
    this.keycloak.logout();
  }

}
