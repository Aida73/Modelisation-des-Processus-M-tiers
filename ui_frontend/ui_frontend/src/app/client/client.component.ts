import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  public isLoggedIn = false;
  public userProfile : KeycloakProfile | null = null;


  constructor(private readonly keycloak: KeycloakService){}

  async ngOnInit() {

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if(this.isLoggedIn){
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    
  }

  logout(){
    this.keycloak.logout();
  }
  
}
