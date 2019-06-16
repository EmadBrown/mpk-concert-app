import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/observable';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'json' as 'json' }


@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  apiURL: string = 'http://localhost/mpk/api/balance.php';

  constructor(private httpClient: HttpClient) { }

  public getBalance(visitor: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/` + "?id=" + visitor.id + '&token=' + visitor.token + '&method=fetch', httpOptions);
  }

  public addBalance(visitor: any, balance: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/` + "?id=" + visitor.id + "&modified=" + visitor.modified +  '&balance=' + balance + '&token=' + visitor.token + '&method=update', httpOptions);
  }
}
