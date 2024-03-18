import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable,Subscription, startWith, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order } from 'src/app/models/model.order';
import { OrderService } from 'src/app/services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppDataState, DataStateEnum } from 'src/app/state/base.state';

@Component({
  selector: 'app-commandes-list',
  templateUrl: './commandes-list.component.html',
  styleUrls: ['./commandes-list.component.scss']
})
export class CommandesListComponent implements OnInit{
  data$! : Observable<AppDataState<Order[]>>;
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  dataSourceSubscription!: Subscription;
  displayedColumns: string[] = ['Client', 'Date de commande', 'Statut', 'Action'];
  readonly DataStateEnum = DataStateEnum;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private orderService:OrderService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.OnGetAllOrders();
    this.dataSourceSubscription = this.data$.subscribe(
      value => {
        if(value.data) {
          this.dataSource.data = value.data;
          this.dataSource.paginator = this.paginator;
        }
      }
    );
  }

  OnGetAllOrders(){
    this.data$ = this.orderService.getAllOrders().pipe(
      map((res: Order[]) => {
        return ({dataState: DataStateEnum.LOADED, data: res})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.errorMessage }))
    );
  }

  goToDetailsRun(id:number){
    this.router.navigate(['view',id],{relativeTo: this.route})
  }
  
  getStatusIcon(statut: string){
    let icon = '';
    let color = '';
    switch (statut) {
      case 'pending':
        icon = 'pending';
        color = '#f0ad4e';
        break;
      case 'finish':
        icon = 'check_circle';
        color = '#22bb33';
        break;
      case 'failed':
        icon = 'block';
        color = '#bb2124';
        break;
      default:
        icon = 'help';
        color = '#fff';
    }
    return {'icon': icon, 'color': color};
  }

  ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
  }
}
