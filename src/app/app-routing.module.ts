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
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { AddTeacherComponent } from './components/teacher/add-teacher/add-teacher.component';
import { SearchWorkerComponent } from './components/worker/search-worker/search-worker.component';
import { AddGradeComponent } from './components/grade/add-grade/add-grade.component';
import { StudentDetailsComponent } from './components/student/student-details/student-details.component';
import { TeacherDetailsComponent } from './components/teacher/teacher-details/teacher-details.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { StudentByNameComponent } from './components/student/search/student-by-name/student-by-name.component';
import { StudentSearchResultComponent } from './components/student/search/student-search-result/student-search-result.component';
import { StudentByAgeComponent } from './components/student/search/student-by-age/student-by-age.component';
import { StudentByJoinDataComponent } from './components/student/search/student-by-join-data/student-by-join-data.component';
import { StudentSearchLevelComponent } from './components/student/search/student-search-level/student-search-level.component';
import { TeacherByNameComponent } from './components/teacher/search/teacher-by-name/teacher-by-name.component';
import { TeacherByAgeComponent } from './components/teacher/search/teacher-by-age/teacher-by-age.component';
import { TeacherByJoinDateComponent } from './components/teacher/search/teacher-by-join-date/teacher-by-join-date.component';
import { TeacherSearchResultComponent } from './components/teacher/search/teacher-search-result/teacher-search-result.component';
import { WorkerDetailsComponent } from './components/worker/worker-details/worker-details.component';
import { ClassDetailsComponent } from './components/class/class-details/class-details.component';

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
   {
      path: 'student/search',
      component: StudentSearchResultComponent,
      children: [
         // { path: '', redirectTo: 'searchByName', pathMatch: 'full' },
         { path: '', component: StudentByNameComponent },
         { path: 'by-age', component: StudentByAgeComponent },
         { path: 'by-join-date', component: StudentByJoinDataComponent },
         { path: 'by-level', component: StudentSearchLevelComponent }
      ]
   },
   { path: "student/details/:id", component: StudentDetailsComponent },
   { path: "student/update/:id", component: AddStudentComponent },

   // teacher mapping
   { path: "teacher/add-teacher", component: AddTeacherComponent },
   {
      path: 'teacher/search',
      component: TeacherSearchResultComponent,
      children: [
         // { path: '', redirectTo: 'searchByName', pathMatch: 'full' },
         { path: '', component: TeacherByNameComponent },
         { path: 'by-age', component: TeacherByAgeComponent },
         { path: 'by-join-date', component: TeacherByJoinDateComponent },
      ]
   },

   { path: "teacher/details/:id", component: TeacherDetailsComponent },
   { path: "teacher/update/:id", component: AddTeacherComponent },

   // class mapping
   { path: "class/add-class", component: AddClassComponent },
   { path: "class/details/:id", component: ClassDetailsComponent },
   { path: "class/search", component: SearchClassComponent },

   // subject mapping
   { path: "subject/add-subject", component: AddSubjectComponent },
   { path: "subject/search", component: SearchSubjectComponent },

   // guardianship mapping
   { path: "guardianship/add-guardianship", component: AddGuardianshipComponent },
   { path: "guardianship/search", component: SearchGuardianshipComponent },


   // worker mapping
   { path: "worker/add-worker", component: AddWorkerComponent },
   { path: "worker/update/:id", component: AddWorkerComponent },
   { path: "worker/search", component: SearchWorkerComponent },
   { path: "worker/details/:id", component: WorkerDetailsComponent },

   // statistics
   { path: "school/statistics", component: StatisticsComponent },
   { path: "student/statistics", component: StatisticsComponent },
   { path: "teacher/statistics", component: StatisticsComponent },


];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponent = [
   // scrach
   RegisterComponent, LoginComponent, HomeComponent,
   // student
   AddStudentComponent, StudentByNameComponent, StudentDetailsComponent, StudentByAgeComponent,
   StudentByJoinDataComponent, StudentSearchLevelComponent, AddGradeComponent,
   // teacher
   AddTeacherComponent, TeacherByNameComponent, TeacherByAgeComponent, TeacherByJoinDateComponent,
   TeacherDetailsComponent,
   // worker
   AddWorkerComponent, SearchWorkerComponent, WorkerDetailsComponent,
   // guardianship
   AddGuardianshipComponent, SearchGuardianshipComponent,
   // subject
   AddSubjectComponent, SearchSubjectComponent,
   // class
   AddClassComponent, SearchClassComponent,ClassDetailsComponent,
   //  stat
   StatisticsComponent
];
