import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {

  student = new Student();

  // test if there data
  hasData = false;

  constructor(private service: StudentService, private _cache: CacheObjectService, private activeRoute: ActivatedRoute, private route: Router) {
    // grap paramter from route snapshot (url);
    let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
    //  grab data from cache  service
    if (Object.keys(this._cache.getObject).length > 0) {
      this.student = this._cache.getObject;
      this.hasData = true;
    } else {
      if (id) {
        this.getById(id);
      }
    }
  }

  getById(id: number) {
    this.service.findById(id).subscribe(
      data => {
        this.student = data;
        this.hasData = this.student.name.length > 0 ? true : this.hasData;
      }, error => {
        console.log(error)
      }
    )
  }

  /**
   * cache object 
   */
  persistObject() {
    this._cache.setObject = this.student;
  }

  /**
   * delete current object
   */
  deletestudentById() {

  }

  setGrade() {
    alert("grade")
    // this._cache.setObject = item;
    this.route.navigate([this.student.id], { relativeTo: this.activeRoute })
  }
}
