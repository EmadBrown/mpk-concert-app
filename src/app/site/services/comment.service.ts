import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Visitor } from './../Interface/visitor'

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }),  responseType: 'json' as 'json' }

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiURL: string = 'http://i410456.hera.fhict.nl/api/comment.php';

  constructor(private httpClient: HttpClient) { }

  public getAllComment(): Observable<any>{
    return this.httpClient.get<any>(`${this.apiURL}/`, httpOptions);
  }

  public addComment(visitor: Visitor): Observable<Visitor> {
    return this.httpClient.post<Visitor>(`${this.apiURL}/`, visitor, httpOptions);
  }

  public editComment(visitor: Visitor): Observable<Visitor> {
    return this.httpClient.put<Visitor>(`${this.apiURL}/`, visitor, httpOptions);
  }

  public removeComment(visitor: Visitor): Observable<Visitor> {
    return this.httpClient.delete<Visitor>(`${this.apiURL}/`+ "?id=" + visitor.id, httpOptions);
  }
}
