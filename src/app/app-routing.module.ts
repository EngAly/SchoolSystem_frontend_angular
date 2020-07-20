import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './siteContent/scratch/home/home.component';
import { RegisterComponent } from './siteContent/scratch/register/register.component';
import { LoginComponent } from './siteContent/scratch/login/login.component';
import { AddSubjectComponent } from './siteContent/subject/add-subject/add-subject.component';
import { AddClassComponent } from './siteContent/class/add-class/add-class.component';
import { AddWorkerComponent } from './siteContent/worker/add-worker/add-worker.component';
import { AddGuardianshipComponent } from './siteContent/guardianship/add-guardianship/add-guardianship.component';
import { SearchClassComponent } from './siteContent/class/search-class/search-class.component';
import { SearchSubjectComponent } from './siteContent/subject/search-subject/search-subject.component';

const routes: Routes = [
  /**
     * full => for like url exactly so that not similar with other urls
     * when url on root url will direct navigate to home path after that will
     * match each component to go it and walk view page.
     * so will redirect if and only if FULL path is empty
     * note you can use PREFIX instead of FULL but prefix has problem that any url has empty->
     * so that it will match any url so we use full
     */
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },


  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },


  // adds  section
  { path: "subject/add-subject", component: AddSubjectComponent },
  { path: "class/add-class", component: AddClassComponent },
  { path: "worker/new-worker", component: AddWorkerComponent },
  { path: "guardianship/new-guardianship", component: AddGuardianshipComponent },

  // search section
  { path: "class/search", component: SearchClassComponent },
  { path: "subject/search", component: SearchSubjectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponent = [RegisterComponent, LoginComponent, HomeComponent,
  AddSubjectComponent, AddClassComponent, AddWorkerComponent, AddGuardianshipComponent,
  SearchClassComponent, SearchSubjectComponent
];
