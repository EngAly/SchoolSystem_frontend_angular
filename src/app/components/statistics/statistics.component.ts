import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'src/assets/js/Chart';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-statistics',
   templateUrl: './statistics.component.html',
   styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnChanges {

   ngOnChanges(changes: SimpleChanges): void {
      alert()
   }

   Linechart = [];
   charType: string = 'bar';
   fontSize = 24;
   x_label: string = "";

   constructor(private _cache: CacheObjectService, private activeRoute: ActivatedRoute) {
      if (Object.keys(this._cache.getObject).length > 0) {
         this.x_label = this._cache.getObject
      }
   }

   ngOnInit(): void {
      var url = window.location.href;
      var content = url.split('/')[3]
      if (content == 'teacher') {
         this.drawChart(["math", "arabic", "english", "history", "logic"], [4, 6, 2, 6, 8])
      } else if (content == 'student') {
         this.drawChart(["male", "female"], [1025, 1050])
      }

   }



   private drawChart(labels: string[], values: number[]) {
      this.Linechart = new Chart('canvas', {
         type: this.charType,
         data: {
            labels: labels,
            datasets: [
               {
                  data: values,
                  borderColor: '#3cb371',
                  backgroundColor: '#3cb371',
               }
            ]
         },
         options: {
            legend: {
               display: false,
            },
            scales: {
               xAxes: [{
                  scaleLabel: {
                     display: true,
                     labelString: this.x_label,
                     fontSize: this.fontSize
                  }
               }],
               yAxes: [{
                  scaleLabel: {
                     display: true,
                     labelString: "Statistics",
                     fontSize: this.fontSize
                  }
               }],
            }
         }
      });
   }
}