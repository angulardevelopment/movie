import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';


export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "details/:id", loadComponent: () => import('./movie-details/movie-details.component').then((m) => m.MovieDetailsComponent)}
];
