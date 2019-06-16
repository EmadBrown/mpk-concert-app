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
            { title: 'Total', value: data.totalVisitors * data.ticketPrice + data.totalSpot * data.spotPrice + data.totalLoanShop + data.totalSaleShops + data.totalSouvenirShop, activeProgress: totalPercentage, description: 'The Amount Of Earnest Money (' + (totalPercentage) + ' %) of ' + data.CapacityOfVisitors * data.ticketPrice },
            { title: 'Tickets', value: data.totalVisitors * data.ticketPrice, activeProgress: ticketPercentage, description: data.totalVisitors + ' In Total Selling Tickets (' + (ticketPercentage) + ' %) Of ' + data.CapacityOfVisitors * data.spotPrice },
            { title: 'Spots', value: data.totalSpot * data.spotPrice, activeProgress: spotPercentage, description: data.totalSpot + ' In Total Selling Spots (' + (spotPercentage) + ' %) Of ' + ((data.CapacityOfVisitors * data.ticketPrice) + (data.CapacityOfVisitors * data.spotPrice)) },
            { title: 'Total Loan Shop', value: data.totalLoanShop, activeProgress: null, description: ' In Total Selling Spots' },
            { title: 'Total Sales Shop', value: data.totalSaleShops, activeProgress: null, description: ' In Total Loan Spots' },
            { title: 'Total Souvenir Shop', value: data.totalSouvenirShop, activeProgress: null, description: ' In Total Souvenir Spots' },
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
