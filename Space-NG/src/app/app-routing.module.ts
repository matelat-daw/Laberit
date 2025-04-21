import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: 'app', component: AppComponent },
  { path: 'planets', component: PlanetsComponent }
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }