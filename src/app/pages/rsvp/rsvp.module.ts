import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RsvpRoutingModule } from './rsvp-routing.module';
import { RsvpComponent } from './rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    RsvpComponent
  ],
  imports: [
    CommonModule,
    RsvpRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // TextMaskModule
  ]
})
export class RsvpModule { }
