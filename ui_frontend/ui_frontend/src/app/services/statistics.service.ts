import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DevisStats, Statistic } from '../models/model.stat';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  public getStats(): Observable<Statistic> {
    return this.http.get<Statistic>(`${environment.api_provider}/statistics`);
  }

  public getStatsDevis(): Observable<DevisStats> {
    return this.http.get<DevisStats>(`${environment.api_provider}/devis/statistics`);
  }
}
