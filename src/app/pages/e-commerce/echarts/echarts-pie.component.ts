import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DataService } from './../../data.service'

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private getData: DataService) {
  }

  ngAfterViewInit() {
    this.getPromise().then(() =>
      this.getData.currentData.subscribe(data => {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors = config.variables;
          const echarts: any = config.variables.echarts;
          this.options = {
            backgroundColor: echarts.bg,
            color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              orient: 'vertical',
              left: 'right',
              data: ['Out Of', 'Concert', 'Camping'],
              textStyle: {
                color: echarts.textColor,
              },
            },
            series: [
              {
                name: 'Visitors',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: [
                  { value: data.totalVisitors - data.totalInEvent - data.totalInCamping, name: 'Out Of' },
                  { value: data.totalInEvent, name: 'Concert' },
                  { value: data.totalInCamping, name: 'Camping' },
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: echarts.itemHoverShadowColor,
                  },
                },
                label: {
                  normal: {
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: echarts.axisLineColor,
                    },
                  },
                },
              },
            ],
          };

        });
      }));
  }

  getPromise() {
    (4)
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Promise complete!"), 500);
    });
  }

  // ngOnDestroy(): void {
  //   this.themeSubscription.unsubscribe();
  // }
}
