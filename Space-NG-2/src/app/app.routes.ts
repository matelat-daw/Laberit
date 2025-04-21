import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlanetsComponent } from './planets/planets.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'planets', component: PlanetsComponent}
];