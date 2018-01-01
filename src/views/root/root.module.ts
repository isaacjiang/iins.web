import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { Root } from './root';

@NgModule({
  declarations: [
    Root,
  ],
  imports: [
    IonicPageModule.forChild(Root),
    TranslateModule.forChild()
  ],
  exports: [
    Root
  ]
})
export class RootModule { }
