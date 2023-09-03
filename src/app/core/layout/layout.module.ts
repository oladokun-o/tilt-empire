import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { NavModule } from './nav/nav.module';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavModule,
    FooterComponent
  ]
})
export class LayoutModule { }
