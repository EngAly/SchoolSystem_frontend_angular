import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Level } from 'src/app/models/Level';
import { LevelService } from 'src/app/services/level.service';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements EndPointAbstracts {

  class = new Level();
  inPrograss: boolean;


  formData = new FormGroup({
    name: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    maxSize: new FormControl('', Validators.required),
    currentSize: new FormControl('', Validators.required)
  })

  constructor(private service: LevelService) { }

  get controls() {
    return this.formData.controls;
  }

  private reset() {
    this.class = {
      id: null,
      name: "",
      floor: null,
      maxSize: null,
      currentSize: null,
      desc: null
    };
  }

  save() {
    this.inPrograss = true;
    this.service.add(this.class).then(
      (saved: boolean) => {
        if (saved) {
          alert(document.getElementById('savedMsg').textContent);
          this.reset();
        } else {
          alert(document.getElementById('unsavedMsg').textContent)
        }
        this.inPrograss = false;
      }
    );
    console.log(this.class);
  }

}