import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Worker } from 'src/app/models/Worker';
import { GuardianshipsComponent } from 'src/app/layout/guardianships/guardianships.component';
import { WorkerService } from 'src/app/services/worker.service';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss']
})
export class AddWorkerComponent implements EndPointAbstracts {

  worker = new Worker();
  inPrograss: boolean = false;

  @ViewChild(GuardianshipsComponent) guardianshipChild;

  formData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    gender: new FormControl('Male', [Validators.required]),
    age: new FormControl('', [Validators.required])
   //  desc: new FormControl('', [])
  });

  constructor(private service: WorkerService) {

  }

  get controls() {
    return this.formData.controls;
  }

  handleGenderChange(event: any) {
    this.worker.gender = this.formData.get('gender').value
  }

  private reset() {
    this.worker = {
      id: null,
      name: "",
      address: "",
      phone: "",
      gender: "",
      age: "",
      desc: this.worker.desc,
      guardianships: null
    };
  }

  save() {
    this.inPrograss = true;
    this.worker.guardianships = this.guardianshipChild.getSelectedItems();
    // alert(JSON.stringify(this.worker));
    this.service.add(this.worker).then(
      (saved: Boolean) => {
        if (saved) {
          alert(document.getElementById('savedMsg').textContent);
          this.reset();
        } else {
          alert(document.getElementById('unsavedMsg').textContent)
        }
        this.inPrograss = false;
      }
    );

  }
}
