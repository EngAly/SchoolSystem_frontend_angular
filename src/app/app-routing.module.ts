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
import { SearchGuardianshipComponent } from './siteContent/guardianship/search-guardianship/search-guardianship.component';
import { SearchTeacherComponent } from './siteContent/teacher/search-teacher/search-teacher.component';
import { SearchStudentComponent } from './siteContent/student/search-student/search-student.component';
import { AddStudentComponent } from './siteContent/student/add-student/add-student.component';
import { AddTeacherComponent } from './siteContent/teacher/add-teacher/add-teacher.component';
import { SearchWorkerComponent } from './siteContent/worker/search-worker/search-worker.component';
import { AddGradeComponent } from './siteContent/grade/add-grade/add-grade.component';
import { StudentDetailsComponent } from './siteContent/student/student-details/student-details.component';

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


  // add section
  { path: "teacher/add-teacher", component: AddTeacherComponent },
  { path: "student/add-student", component: AddStudentComponent },


  { path: "class/add-class", component: AddClassComponent },
  { path: "subject/add-subject", component: AddSubjectComponent },

  { path: "guardianship/add-guardianship", component: AddGuardianshipComponent },
  { path: "worker/add-worker", component: AddWorkerComponent },
  { path: "student/grade/:id", component: AddGradeComponent },



  // search section
  { path: "teacher/search", component: SearchTeacherComponent },
  { path: "student/search", component: SearchStudentComponent },

  { path: "class/search", component: SearchClassComponent },
  { path: "subject/search", component: SearchSubjectComponent },

  { path: "guardianship/search", component: SearchGuardianshipComponent },
  { path: "worker/search", component: SearchWorkerComponent },



  // shows 
  { path: "student/details/:id", component: StudentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponent = [RegisterComponent, LoginComponent, HomeComponent,

  AddTeacherComponent, AddStudentComponent, AddSubjectComponent, AddClassComponent,
  AddWorkerComponent, AddGuardianshipComponent, AddGradeComponent,

  SearchTeacherComponent, SearchStudentComponent, SearchClassComponent, SearchSubjectComponent,
  SearchGuardianshipComponent, SearchWorkerComponent,

  StudentDetailsComponent
];
