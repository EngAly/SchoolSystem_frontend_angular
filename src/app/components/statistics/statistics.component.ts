import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'src/assets/js/Chart';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute } from '@angular/router';
import { StatService } from 'src/app/services/stat.service';

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
   fontSize = 12;

   // handle all labels for x axis
   labels = []
   // handle all values for y axis
   values = []

   //  label for x horizontal
   x_label: string = "";

   constructor(private service: StatService, private _cache: CacheObjectService, private activeRoute: ActivatedRoute) {
      if (Object.keys(this._cache.getObject).length > 0) {
         this.x_label = this._cache.getObject
      }
   }

   ngOnInit(): void {
      this.getStatProprty();
   }

   private getStatProprty() {
      var url = window.location.href;
      var segments = url.split('/')
      var content = segments[segments.length - 2]
      if (content == 'school') {
         this.getSchoolStat();
      } else if (content == 'student') {
         this.getstudentStat();
      }
      else if (content == 'student') {
      }
   }

   /**
    * get stat for all school entities like teachers, students, classes, ...
    * this is consider snippets for school
    */
   getSchoolStat() {
      this.service.getSchoolStat().subscribe(
         data => this.drawChart(Object.keys(data), Object.values(data))
         , error => console.log(error))
   }

   getstudentStat() {
      this.service.getStudentStat().subscribe(
         // data => this.drawChart(Object.keys(data), Object.values(data))
         data => alert(JSON.stringify(data))
         , error => console.log(error))
   }

   getTeacherLevelStat() {

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