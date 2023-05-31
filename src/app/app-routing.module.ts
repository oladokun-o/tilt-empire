import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    component: AppComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PagenotfoundComponent
  }
];

const routerOptions: ExtraOptions = {
  initialNavigation: 'enabled',
  useHash: false,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
