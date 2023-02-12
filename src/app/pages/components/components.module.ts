import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { NextEventComponent } from './next-event/next-event.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AboutComponent,
    NextEventComponent,
    UpcomingEventsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AboutComponent,
    NextEventComponent,
    UpcomingEventsComponent,
    ContactComponent
  ]
})
export class ComponentsModule { }
