import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Devis, DevisDetail } from 'src/app/models/model.order';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class DevisService {

  constructor(private http:HttpClient ) { }

  public getClientDevis(client_id: string): Observable<Devis[]> {
      return this.http.get<Devis[]>(`${environment.api_client}/devis/clients/${client_id}`);

  }

  public getDevis(devis_id: string): Observable<DevisDetail>{
    return this.http.get<DevisDetail>(`${environment.api_client}/devis/${devis_id}`);
  }

  public updateDevis(devis_id: string, status: string): Observable<Devis>{
    return this.http.put<Devis>(`${environment.api_client}/devis?devis_id=${devis_id}&status=${status}`,{});
  }

}