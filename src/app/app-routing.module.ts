import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditPersonComponent } from './person/edit-person/edit-person.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { ListPersonComponent } from './person/list-person/list-person.component';
import { CreateExperienceComponent } from './cruds/experience/create-experience/create-experience.component';
import { EditExperienceComponent } from './cruds/experience/edit-experience/edit-experience.component';
import { ExperienceComponent } from './components/experience/experience.component';

const routes: Routes = [
  {
    path:'', 
    component: ListPersonComponent
  },
  {
    path:'create', 
    component: CreatePersonComponent
  },
  {
    path:'edit/:idPerson',
    component: EditPersonComponent
  },
  {
    path: ':idPerson/home', 
    component: HomeComponent
  },
  {
    path: 'experience/create/:idPerson',
    component: CreateExperienceComponent
  },
  {
    path: 'experience/edit/:idExperience',
    component: EditExperienceComponent
  },
  {
    path: ':idPerson/experiences',
    component: ExperienceComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
