import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Event, Events, NextEvent } from '../core/resolvers/default-service.resolver';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          events: Events,
          next_event: NextEvent
        }
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        resolve: {
          events: Events,
          next_event: NextEvent
        }
      },
      {
        path: 'events',
        component: EventsComponent,
        resolve: {
          events: Events,
          next_event: NextEvent
        }
      },
      {
        path: 'event/:id',
        component: EventComponent,
        resolve: {
          events: Events,
          event: Event
        }
      },
      {
        path: 'rsvp',
        loadChildren: () => import('./rsvp/rsvp.module').then(m => m.RsvpModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
