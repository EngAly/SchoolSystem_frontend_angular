import { Component } from '@angular/core';
import { Guardianship } from 'src/app/models/Guardianship';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GuardianshipService } from 'src/app/services/guardianship.service';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';

@Component({
  selector: 'add-guardianship',
  templateUrl: './add-guardianship.component.html',
  styleUrls: ['./add-guardianship.component.scss']
})
export class AddGuardianshipComponent implements EndPointAbstracts {
  guardianship = new Guardianship();

  formData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    desc: new FormControl('', [])
  });

  constructor(private service: GuardianshipService) { }

  get controls() {
    return this.formData.controls;
  }

  save() {
    this.service.add(this.guardianship).then(
      saved => {
        if (saved) {
          alert(document.getElementById('savedMsg').textContent);
          this.guardianship.name = "";
        } else {
          alert(document.getElementById('unsavedMsg').textContent)
        }
      }
    );
    console.log(this.guardianship)
  }

}
