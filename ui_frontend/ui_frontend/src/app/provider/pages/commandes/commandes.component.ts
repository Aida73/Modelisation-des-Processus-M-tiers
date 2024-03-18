import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable, startWith, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order } from 'src/app/models/model.order';
import { OrderService } from 'src/app/services/order.service';
import { AppDataState, DataStateEnum } from 'src/app/state/base.state';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent{

  
  
}
