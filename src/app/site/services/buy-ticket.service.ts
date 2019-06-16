import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Visitor } from './../Interface/visitor';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class BuyTicketService {

  apiURL: string ='http://localhost:4200/api/register';

  constructor(private httpClient: HttpClient) { }

  public createCustomer(visitor: Visitor): Observable<Visitor> {
    return this.httpClient.post<Visitor>(`${this.apiURL}/`, visitor, httpOptions);
  }
}
