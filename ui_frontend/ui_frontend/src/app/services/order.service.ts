import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/model.order';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient ) { }

  public getAllOrders(): Observable<Order[]> {
      return this.http.get<Order[]>(`${environment.api_provider}/orders`);
      
  }

}