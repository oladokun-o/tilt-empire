import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RsvpComponent } from './rsvp.component';

const routes: Routes = [{ path: '', component: RsvpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RsvpRoutingModule { }
