import { Component } from '@angular/core';
import { Guardianship } from 'src/app/models/Guardianship';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IControllerMethods } from 'src/app/interfaces/IControllerMethods';
import { GuardianshipService } from 'src/app/services/guardianship.service';

@Component({
  selector: 'add-guardianship',
  templateUrl: './add-guardianship.component.html',
  styleUrls: ['./add-guardianship.component.scss']
})
export class AddGuardianshipComponent implements IControllerMethods {
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
