import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ChartModule } from 'primeng/chart';
import { Observable, Subscription } from 'rxjs';
import { DevisStats, Statistic } from 'src/app/models/model.stat';
import { StatisticsService } from 'src/app/services/statistics.service';
import { AppDataState } from 'src/app/state/base.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

    stats$!: Observable<Statistic>;
    devisStats$!: Observable<AppDataState<DevisStats>>;
    statsSubscription!: Subscription;
    statsGlobalStats!: any;
    orderStatsSubscription!: Subscription;
    ordersStatusStats!: any;
    statsOptions!: any;
    basicData: any;

    orderStatusDataOptions: any;


    basicOptions: any;

    constructor(private keycloak: KeycloakService,
                private statService: StatisticsService){}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.stats$ = this.statService.getStats()
    this.statsSubscription = this.statService.getStatsDevis().subscribe(
        (value: DevisStats) => {
            if(value) {
                this.statsGlobalStats = {
                    labels: ['Pending', 'Validé'],
                    datasets: [
                        {
                            data: [value.pending, value.confirmed],
                            backgroundColor: ['rgb(255, 0, 0)', 'rgb(240, 173, 78)'],
                        }
                    ]
                };
            }
        }
    );


    this.statsOptions = {
        cutout: '60%',
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    this.basicData = {
      labels: ['Pas encore validées', 'Validées', 'Réalisées'],
      datasets: [
          {
              label: 'Orders',
              data: [4, 1, 1],
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
              borderWidth: 1
          }
      ]
    };
    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
    };

  }


  ngOnDestroy(): void {
    this.statsSubscription.unsubscribe();
    //this.runStatusStatsSubscription.unsubscribe();
}



}
