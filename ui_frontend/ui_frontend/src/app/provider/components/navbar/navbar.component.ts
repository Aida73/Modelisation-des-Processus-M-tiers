import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable} from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  activeRouteName$!: Observable<string>;
  userProfile? : KeycloakProfile;
  roleName!: string;


  constructor(private route: ActivatedRoute, private router: Router, private keycloak: KeycloakService){}

  async ngOnInit() {

    this.activeRouteName$ = this.getActiveRoute();
    this.userProfile = await this.keycloak.loadUserProfile();
    this.roleName = this.getRoleNameValue(this.keycloak.getUserRoles());
    
  }

  getRoleNameValue(roles:Array<string>) {
    let rolename = "";
    if  (roles.includes('superuser') && roles.includes('wet_member')) {
      rolename = "CHEF DU WET LAB";
    }
    else if (roles.includes('superuser') && roles.includes('dry_member')) {
      rolename = "CHEF DU DRY LAB";
    }
    else if (roles.includes('wet_member')) {
      rolename = "WET LAB";
    }
    else if (roles.includes('dry_member')) {
      rolename = "DRY LAB";
    } else {
      rolename = "USER";
    }
    return rolename;
  }

  getActiveRoute(): Observable<string>{
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.snapshot.firstChild?.routeConfig?.path || '')
    );

  }

  logout(){
    this.keycloak.logout();
  }

}
