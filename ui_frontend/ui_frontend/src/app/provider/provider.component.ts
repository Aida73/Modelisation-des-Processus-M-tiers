import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ROUTE } from '../models/route.model';

export const ROUTES: ROUTE[] = [
  {
    path: '/provider/commandes',
    name: 'Commandes',
    icon: 'fa fa-bar-chart'
  },
  {
    path: '/provider/devis',
    name: 'Devis',
    icon: 'fa fa-folder'
  },
  {
    path: '/provider/dashboard',
    name: 'Dashboard',
    icon: 'fa fa-folder'
  }

]

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent {

  sidebarExpanded = true;
  public isLoggedIn = false;
  public userProfile : KeycloakProfile | null = null;
  routes:ROUTE[]=ROUTES;

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
