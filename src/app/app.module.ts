import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ngx translate modules
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './siteContent/scratch/start/start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectsComponent } from './layout/subjects/subjects.component';
import { GuardianshipsComponent } from './layout/guardianships/guardianships.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    routingComponent,
    SubjectsComponent,
    GuardianshipsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}