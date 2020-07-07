import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  dir: string
  isRight: boolean
  smallSize: boolean

  constructor(private translate: TranslateService) {
    // check screen size when user open site on its device
    this.checkWidth()

    // call lang settings from session 
    this.useLanguage(localStorage.getItem('currentLang'))
  }

  useLanguage(lang: string) {
    this.langSetting(lang);
  }

  private langSetting(lang: string) {
    if (lang == "ar") {
      this.dir = "rtl";
      this.isRight = true;
    } else {
      this.dir = "ltr";
      this.isRight = false;
    }
    // set  dir setting if RTL or LTR
    this.dirSetting(lang, this.dir);
    // save selected language and page dir to session to be default when reopen
    localStorage.setItem('currentLang', lang);
    //  call translate to switch between two languages
    this.translate.use(lang);
  }

  private dirSetting(lang: string, dir: string) {
    // setting page direction
    document.getElementsByTagName('body')[0].setAttribute('dir', dir);
    document.getElementsByTagName('html')[0].setAttribute('lang', lang);
  }

  /**
   * periodic update each seceen size changes
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkWidth()
  }


  private checkWidth() {
    if (window.innerWidth < 620) {
      this.smallSize = true
    } else {
      this.smallSize = false
    }
  }
}

