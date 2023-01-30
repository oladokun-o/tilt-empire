import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './components/components.module';
import { ModalsModule } from './modals/modals.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ModalsModule
  ]
})
export class SharedModule { }
