import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/scratch/home/home.component';
import { RegisterComponent } from './components/scratch/register/register.component';
import { LoginComponent } from './components/scratch/login/login.component';
import { AddSubjectComponent } from './components/subject/add-subject/add-subject.component';
import { AddClassComponent } from './components/class/add-class/add-class.component';
import { AddWorkerComponent } from './components/worker/add-worker/add-worker.component';
import { AddGuardianshipComponent } from './components/guardianship/add-guardianship/add-guardianship.component';
import { SearchClassComponent } from './components/class/search-class/search-class.component';
import { SearchSubjectComponent } from './components/subject/search-subject/search-subject.component';
import { SearchGuardianshipComponent } from './components/guardianship/search-guardianship/search-guardianship.component';
import { SearchTeacherComponent } from './components/teacher/search-teacher/search-teacher.component';
import { SearchStudentComponent } from './components/student/search-student/search-student.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { AddTeacherComponent } from './components/teacher/add-teacher/add-teacher.component';
import { SearchWorkerComponent } from './components/worker/search-worker/search-worker.component';
import { AddGradeComponent } from './components/grade/add-grade/add-grade.component';
import { StudentDetailsComponent } from './components/student/student-details/student-details.component';
import { TeacherDetailsComponent } from './components/teacher/teacher-details/teacher-details.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

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

   // student mapping
   { path: "student/add-student", component: AddStudentComponent },
   { path: "student/grade/:id", component: AddGradeComponent },
   { path: "student/search", component: SearchStudentComponent },
   { path: "student/details/:id", component: StudentDetailsComponent },
   { path: "student/update/:id", component: AddStudentComponent },
   { path: "student/statistics", component: StatisticsComponent },

   // teacher mapping
   { path: "teacher/add-teacher", component: AddTeacherComponent },
   { path: "teacher/search", component: SearchTeacherComponent },
   { path: "teacher/details/:id", component: TeacherDetailsComponent },
   { path: "teacher/update/:id", component: AddTeacherComponent },
   { path: "teacher/statistics", component: StatisticsComponent },

   // class mapping
   { path: "class/add-class", component: AddClassComponent },
   { path: "class/search", component: SearchClassComponent },

   // subject mapping
   { path: "subject/add-subject", component: AddSubjectComponent },
   { path: "subject/search", component: SearchSubjectComponent },

   // guardianship mapping
   { path: "guardianship/add-guardianship", component: AddGuardianshipComponent },
   { path: "guardianship/search", component: SearchGuardianshipComponent },


   // worker mapping
   { path: "worker/add-worker", component: AddWorkerComponent },
   { path: "worker/search", component: SearchWorkerComponent },
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

   StudentDetailsComponent, TeacherDetailsComponent,StatisticsComponent
];
