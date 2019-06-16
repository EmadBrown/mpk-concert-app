import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DataService } from "./../../data.service";


@Component({
  selector: 'ngx-d3-bar',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class D3BarComponent implements OnDestroy, OnInit {

  results = [];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'shops';
  yAxisLabel = 'sales';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private getdata: DataService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnInit() {
    this.getPromise().then(() =>
      this.getdata.currentData.subscribe(data => {
        this.results = [
          { name: 'Souvenir Shop', value: '€ ' + data.totalSouvenirShop },
          { name: 'Food & Drinks Shop', value: '€ ' + data.totalSaleShops },
          { name: 'Loan Shop', value: '€ ' + data.totalLoanShop },
        ]
      }));
  }

  getPromise() {
    (4)
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Promise complete!"), 500);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
