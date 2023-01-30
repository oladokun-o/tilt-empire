import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  static injector: Injector;
  constructor(private injector: Injector) {
    CoreModule.injector = injector;
  }
}
