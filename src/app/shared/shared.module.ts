import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './components/components.module';
import { ModalsModule } from './modals/modals.module';
import { LightboxComponent } from './lightbox/lightbox.component';



@NgModule({
  declarations: [
    LightboxComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ModalsModule
  ]
})
export class SharedModule { }
