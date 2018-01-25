import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IInsWebApp } from './app.component';

import { Items } from '../data/items';
import { Settings } from '../services/settings.service';
import { User } from '../services/user.service';
import { Api } from '../services/api.service';

import {Root} from "../views/root/root";
import {MenuDirective} from "../directives/menu.directive";
import {ContentDirective} from "../directives/content.directive";
import {HeaderComponent} from "../components/header/header";
import {MenuComponent} from "../components/menu/menu";
import {QuoteListComponent} from "../components/quote/quote.list";
import {CustomerlistComponent} from "../components/customer/customerlist";
import {QuoteInputComponent} from "../components/quote/quote.input";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    Root,
    MenuDirective,ContentDirective,
    HeaderComponent,MenuComponent,QuoteListComponent,QuoteInputComponent,CustomerlistComponent,
    IInsWebApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(IInsWebApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IInsWebApp,
    Root,
    MenuComponent,QuoteListComponent,QuoteInputComponent,CustomerlistComponent,
  ],
  providers: [
    Api,
    Items,
    User,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
