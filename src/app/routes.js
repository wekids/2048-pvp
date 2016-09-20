import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BoardComponent} from './board';

@Component({
  selector: 'game-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes = [
  {
    path: '',
    component: BoardComponent
  }
];

export const routing = RouterModule.forRoot(routes);
