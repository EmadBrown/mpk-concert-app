import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiURL: string = 'http://i410456.hera.fhict.nl/api/dashboard.php';

  constructor(private httpClient: HttpClient) { }

  public getAllVisitors(token: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/` + "?token=" + token, httpOptions);
  }

  public removeVisitor(visitor: any): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.apiURL}/` + "?id=" + visitor.id, httpOptions);
  }

  public editVisitor(visitor: any): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.apiURL}/`, visitor, httpOptions);
  }
}
