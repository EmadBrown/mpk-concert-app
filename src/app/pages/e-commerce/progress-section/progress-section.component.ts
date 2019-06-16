import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { DataService } from "./../../data.service";


@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnDestroy, OnInit {

  private alive = true;

  data: any;

  progressInfoData: ProgressInfo[];

  constructor(
    private statsProgressBarService: StatsProgressBarData,
    private getdata: DataService
  ) {
    // this.statsProgressBarService.getProgressInfoData()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((data) => {
    //     this.progressInfoData = data;
    //   });
  }

  ngOnInit() {
    this.getPromise().then(() =>
      this.getdata.currentData.subscribe(data => {
        let ticketPercentage = (data.totalVisitors * data.ticketPrice * 100) / (data.CapacityOfVisitors * data.ticketPrice);
        let spotPercentage = (data.totalSpot * data.spotPrice * 100) / (data.CapacityOfVisitors * data.spotPrice);
        let totalPercentage = ((data.totalVisitors * data.ticketPrice) + (data.totalSpot * data.spotPrice)) * 100 / ((data.CapacityOfVisitors * data.ticketPrice) + (data.CapacityOfVisitors * data.spotPrice));

        if (data != null)
          this.progressInfoData = [
            { title: 'Total For The Whole Event', value: data.totalVisitors * data.ticketPrice + data.totalSpot * data.spotPrice + data.totalLoanShop + data.totalSaleShops + data.totalSouvenirShop, activeProgress: totalPercentage, description: 'The amount of money (' + (totalPercentage) + ' %) of ' + data.CapacityOfVisitors * data.ticketPrice },
            { title: 'Earned From Tickets', value: data.totalVisitors * data.ticketPrice, activeProgress: ticketPercentage, description: data.totalVisitors + ' in iotal selling tickets (' + (ticketPercentage) + ' %) of ' + data.CapacityOfVisitors * data.spotPrice },
            { title: 'Earned From Spots', value: data.totalSpot * data.spotPrice, activeProgress: spotPercentage, description: data.totalSpot + ' in total selling spots (' + (spotPercentage) + ' %) of ' + ((data.CapacityOfVisitors * data.ticketPrice) + (data.CapacityOfVisitors * data.spotPrice)) },
            { title: 'Earned From Loan Shop', value: data.totalLoanShop, activeProgress: null, description: '... no sales forecast' },
            { title: 'Earned From Food & Drinks Shop', value: data.totalSaleShops, activeProgress: null, description: '... no sales forecast' },
            { title: 'Earned From Souvenir Shop', value: data.totalSouvenirShop, activeProgress: null, description: '... no sales forecast' },
          ]
      }));
  }

  getPromise() {
    (4)
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Promise complete!"), 500);
    });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
