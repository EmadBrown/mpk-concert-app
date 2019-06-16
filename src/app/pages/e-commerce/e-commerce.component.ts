import { Component, OnInit } from '@angular/core';
import { DataService } from "./../data.service";

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {

  data: any;

  constructor(private getdata: DataService) { }

  ngOnInit() {
    this.getdata.currentData.subscribe(data => this.data = data)
  }

}
