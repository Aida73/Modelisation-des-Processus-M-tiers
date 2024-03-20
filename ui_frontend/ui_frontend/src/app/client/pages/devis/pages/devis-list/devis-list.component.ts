import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable,Subscription, startWith, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Devis } from 'src/app/models/model.order';
import { DevisService } from 'src/app/services/clients/devis.service';
import { AppDataState, DataStateEnum } from 'src/app/state/base.state';

@Component({
  selector: 'app-devis-list',
  templateUrl: './devis-list.component.html',
  styleUrls: ['./devis-list.component.scss']
})
export class DevisListComponent {

  public isLoggedIn = false;
  public userProfile : KeycloakProfile | null = null;
  data$! : Observable<AppDataState<Devis[]>>;
  dataSource: MatTableDataSource<Devis> = new MatTableDataSource<Devis>();
  dataSourceSubscription!: Subscription;
  displayedColumns: string[] = ['Identifiant','Order', 'Statut', 'Action'];
  readonly DataStateEnum = DataStateEnum;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private devisService:DevisService, 
              private router: Router,
              private route: ActivatedRoute,
              private keycloak: KeycloakService) {}

  async ngOnInit() {

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if(this.isLoggedIn){
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    this.OnGetClientDevis(String(this.userProfile?.username));

    this.dataSourceSubscription = this.data$.subscribe(
      value => {
        if(value.data) {
          this.dataSource.data = value.data;
          this.dataSource.paginator = this.paginator;
        }
      }
    );
  }

  OnGetClientDevis(id: string){
    this.data$ = this.devisService.getClientDevis(id).pipe(
      map((res: Devis[]) => {
        return ({dataState: DataStateEnum.LOADED, data: res})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.errorMessage }))
    );
  }

  goToDetailsDevis(id:string){
    this.router.navigate([id],{relativeTo: this.route})
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

  ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
  }
}
