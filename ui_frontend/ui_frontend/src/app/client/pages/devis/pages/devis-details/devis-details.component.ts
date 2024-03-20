import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of, startWith} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { DevisDetail } from 'src/app/models/model.order';
import { DevisService } from 'src/app/services/clients/devis.service';
import { DataStateEnum } from 'src/app/state/base.state';

@Component({
  selector: 'app-devis-details',
  templateUrl: './devis-details.component.html',
  styleUrls: ['./devis-details.component.scss']
})
export class DevisDetailsComponent implements OnInit{

  devis$!: Observable<DevisDetail>;
  data$!: Observable<DevisDetail>;
  devisId!: string;
  confirmed!: string; 
  dataSourceSubscription!: Subscription;
  readonly DataStateEnum = DataStateEnum;

  constructor(private devisService: DevisService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {

    this.devisId = String(this.route.snapshot.paramMap.get('id'));
    this.devis$ = this.devisService.getDevis(this.devisId);
    this.devis$.pipe(
      map(devis => devis.status) 
    ).subscribe(status => {
      
      if(status=="pending"){
        this.confirmed = status; 
        //this.OnConfirmOrder(this.devisId, {"status": "valide"});
      }

      
    });
    
      
  }

  OnConfirmOrder(){
    this.devisService.updateDevis(this.devisId, "valide").subscribe({
      next: (response) => {
        console.log('Status updated', response);
        this.router.navigate(['/client/devis'])
      },
      error: (error) => console.error('Error updating order', error),
    });
   
  }

  getStatusIcon(statut: string){
    let icon = '';
    let color = '';
    switch (statut) {
      case 'pending':
        icon = 'pending';
        color = '#f0ad4e';
        break;
      // case 'valide':
      //   icon = 'pending';
      //   color = '#ABEBC6'; //#
      //   break;
      case 'valide':
        icon = 'check_circle';
        color = '#22bb33'; //bb2124
        break;
      default:
        icon = 'help';
        color = '#fff';
    }
    return {'icon': icon, 'color': color};
  }
}
