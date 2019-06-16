import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DataService } from "./../../data.service";


@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private getdata: DataService) {

  }

  ngOnInit() {

    let salesItemName = [];
    let salesItemTotal = [];


    this.getPromise(2000).then(() => this.getdata.currentData.subscribe(data => {
      data.sales.sales.map(item => {   
        salesItemName.push(item.saleItemName);
        salesItemTotal.push(item.saleItemPrice * item.quantity);
       
      });
    })).then(() => {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: salesItemName,
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: 'Score',
              type: 'bar',
              barWidth: '60%',
              data: salesItemTotal,
            },
          ],
        };
      });
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  getPromise(value) {
    (4)
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Promise complete!"), value);
    });
  }
}
