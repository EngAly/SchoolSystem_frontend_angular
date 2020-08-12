import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';

// 
import { CKEditorModule } from 'ng2-ckeditor';

// ngx translate modules
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// added component
import { StartComponent } from './siteContent/scratch/start/start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchGuardianComponent } from './siteContent/guardian/search-guardian/search-guardian.component';
import { AddGuardianComponent } from './siteContent/guardian/add-guardian/add-guardian.component';

// contains all layouts
import { Layouts } from './layout/layouts';
import { TeacherDetailsComponent } from './siteContent/teacher/teacher-details/teacher-details.component';
 
@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    routingComponent,
    SearchGuardianComponent,
    AddGuardianComponent,
    Layouts,
    TeacherDetailsComponent
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
  providers: [TranslateService,
    // if you want to remove providedIn: 'root' in service inject it here
    // StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}