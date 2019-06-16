import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from "./../../data.service";
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent implements OnInit {

  settingsVisitors = {
    actions: false,
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      location: {
        title: 'Location',
        type: 'string',
      },
      balance: {
        title: 'Balance',
        type: 'number',
      },
      Camping_ID: {
        title: 'Spot Id',
        type: 'string',
      },
      created: {
        title: 'Reservation date',
        type: 'string',
      }
    },
  };


  settingsSales = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      saleItemName: {
        title: 'Name',
        type: 'string',
      },
      saleItemPrice: {
        title: 'Price',
        type: 'string',
      },
      quantity: {
        title: 'Quantity',
        type: 'string',
      },
      total: {
        title: 'Total',
        type: 'number',
      },
    },
  };


  settingsSouvenir = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      souvenirItemName: {
        title: 'Name',
        type: 'string',
      },
      souvenirItemPrice: {
        title: 'Price',
        type: 'string',
      },
      quantity: {
        title: 'Quantity',
        type: 'string',
      },
      total: {
        title: 'Total',
        type: 'number',
      },
    },
  };

  sourceVisitor: LocalDataSource = new LocalDataSource();
  sourceSales: LocalDataSource = new LocalDataSource();
  sourceSouvenir: LocalDataSource = new LocalDataSource();


  visitor: boolean = true;
  sale: boolean = false;
  souvenir: boolean = false;
  constructor(
    private getdata: DataService) {

  }

  ngOnInit() {
    this.getPromise().then(() => this.getdata.currentData.subscribe(data => {
      this.sourceVisitor.load(data.data.data);
      this.sourceSales.load(data.sales.sales);
      this.sourceSouvenir.load(data.souvenir.souvenir);
    }));


  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getPromise() {
    (4)
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Promise complete!"), 1000);
    });
  }
}
