import { Routes } from '@angular/router';
import { EntreprisesComponent } from './pages/entreprises/entreprises';
import { EquipesComponent } from './pages/equipes/equipes';
import { ProjetsComponent } from './pages/projets/projets';
import { ProjetsDetaillesComponent } from './pages/projets-detailles/projets-detailles';

export const routes: Routes = [
  { path: '', redirectTo: 'entreprises', pathMatch: 'full' },
  { path: 'entreprises',       component: EntreprisesComponent },
  { path: 'equipes',           component: EquipesComponent },
  { path: 'projets',           component: ProjetsComponent },
  { path: 'projets-detailles', component: ProjetsDetaillesComponent },
];
