import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { LayoutModule } from '../core/layout/layout.module';
import { GalleryComponent } from './gallery/gallery.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    GalleryComponent,
    EventsComponent,
    EventComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
