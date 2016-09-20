import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';

import {BoardComponent} from './board';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    RootComponent,
    BoardComponent
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
