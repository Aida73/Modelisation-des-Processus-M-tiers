import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable,Subscription, startWith, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order } from 'src/app/models/model.order';
import { OrderService } from 'src/app/services/order.service';
import { DataStateEnum } from 'src/app/state/base.state';

@Component({
  selector: 'app-commandes-details',
  templateUrl: './commandes-details.component.html',
  styleUrls: ['./commandes-details.component.scss']
})
export class CommandesDetailsComponent implements OnInit{

  order$!: Observable<Order>;
  data$!: Observable<Order>;
  orderId!: string;
  status!: string;
  confirmed!: string; 
  realised!: string;
  terminated!: string;
  dataSourceSubscription!: Subscription;
  readonly DataStateEnum = DataStateEnum;

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {

    this.orderId = String(this.route.snapshot.paramMap.get('id'));
    this.order$ = this.orderService.getOrder(this.orderId);
    this.order$.pipe(
      map(order => order.status) 
    ).subscribe(status => {
      
      if(status=="pending"){
        this.confirmed = status; 
        //this.OnConfirmOrder(this.orderId, {"status": "valide"});
      }
      else if(status=="valide"){
        this.realised = status;
        //this.OnConfirmOrder(this.orderId, {"status": "realise"})
      }
      else if(status=="realise"){
        this.terminated = status;
      }
    
      
    });

    this.OnConfirmOrder(this.status);
    
      
  }

  OnConfirmOrder(status: string){
    this.orderService.updateOrder(this.orderId, {"status":status}).subscribe({
      next: (response) => {
        console.log('Order updated', response);
        this.router.navigate(['/provider/commandes'])
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
      case 'valide':
        icon = 'pending';
        color = '#ABEBC6'; //#
        break;
      case 'realise':
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
