import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private  dataSource =  new BehaviorSubject(null);
  currentData =  this.dataSource.asObservable();

  constructor() { }

  async changeData(data: any) {
    await this.dataSource.next(data);
  }

}