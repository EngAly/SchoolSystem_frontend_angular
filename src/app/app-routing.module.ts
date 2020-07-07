import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './scratch/register/register.component';
import { LoginComponent } from './scratch/login/login.component';
import { HomeComponent } from './scratch/home/home.component';
import { AddStudentComponent } from './studentContent/add-student/add-student.component';
import { AddSubjectComponent } from './subjectContent/add-subject/add-subject.component';
import { AddClassComponent } from './classContent/add-class/add-class.component';



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
  // Student
  { path: "subject/add-subject", component: AddSubjectComponent },
  { path: "class/add-class", component: AddClassComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponent = [RegisterComponent, LoginComponent, HomeComponent,
  AddStudentComponent, AddSubjectComponent, AddClassComponent
];
