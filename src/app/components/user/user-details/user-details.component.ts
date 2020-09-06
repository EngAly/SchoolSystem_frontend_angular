import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/Register';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { UserService } from 'src/app/services/user.service';

@Component({
   selector: 'app-user-details',
   templateUrl: './user-details.component.html',
   styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

   user = new Register();
   // flag to use if there data
   hasData = true;

   constructor(private service: UserService, private _cache: CacheObjectService,
      private activeRoute: ActivatedRoute, private route: Router) { }

   ngOnInit(): void {
      // let username = this.activeRoute.snapshot.paramMap.get('username') // risk
      // get username from local Storage not from url to prevent user to get another username details
      this.getByName(localStorage.getItem('username'));
   }

   /**
     * get user from server side by its id
     * @param id: id to get object by it
     */
   getByName(username: string) {
      this.service.getDetailsByName(username).subscribe(
         data => {
            this.user = data;
            this.hasData = this.user ? true : false;
            // redirect to username details
            this.route.navigate(['users/', this.user.username])
         }, err => {
            this.hasData = false;
            console.log(err)
         }
      )
   }

   update() {
      this._cache.setObject = this.user;
      this.route.navigate(['users/update/', this.user.id])
   }

   deleteById() {
      // this.service.deleteById(this.user.id).subscribe(
      //    data => {
      //       alert("Data Is Deleted Successfully")
      //       this.route.navigate(['worker/search'])
      //    }, err => {
      //       if (err['status'] == 401 || err['status'] == 403) {
      //          alert("You Not Have Permissions")
      //       }
      //       console.log(err);
      //    }
      // )
   }
}