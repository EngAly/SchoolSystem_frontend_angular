import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';

// 
import { CKEditorModule } from 'ng2-ckeditor';

// ngx translate modules
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// added component
import { StartComponent } from './components/scratch/start/start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchGuardianComponent } from './components/guardian/search-guardian/search-guardian.component';
import { AddGuardianComponent } from './components/guardian/add-guardian/add-guardian.component';

// contains all layouts
import { Layouts } from './layout/layouts';
import { StudentSearchResultComponent } from './components/student/search/student-search-result/student-search-result.component';
import { TeacherSearchResultComponent } from './components/teacher/search/teacher-search-result/teacher-search-result.component';
import { JWTAuthInterceptorService } from './services/jwtauth-interceptor.service';


@NgModule({
   declarations: [
      AppComponent,
      StartComponent,
      routingComponent,
      SearchGuardianComponent,
      AddGuardianComponent,
      Layouts,
      StudentSearchResultComponent,
      TeacherSearchResultComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      CKEditorModule,
      TranslateModule.forRoot({
         defaultLanguage: 'en',
         loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
         }
      })

   ],
   // to register a service with angular injector using the provider meta data
   providers: [
      TranslateService,

      // can add multi (more one) interceptors and will execute in sort
      {
         provide: HTTP_INTERCEPTORS,
         useClass: JWTAuthInterceptorService,
         multi: true
      },
      DatePipe
      // if you want to remove providedIn: 'root' in service inject it here
      // StudentService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}