import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RsvpRoutingModule } from './rsvp-routing.module';
import { RsvpComponent } from './rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
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
    // TextMaskModule,
    NgbTooltipModule,
    ClipboardModule
  ]
})
export class RsvpModule { }
