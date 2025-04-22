import { Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';
import { PlanetsComponent } from './planets/planets.component';

export const routes: Routes = [
    {path: '', component: EmptyComponent},
    {path: '*', redirectTo: '', pathMatch: 'full'},
    {path: 'planets', component: PlanetsComponent}
];