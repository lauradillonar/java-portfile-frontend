import { ProjectComponent } from './components/project/project.component';
import { EditProjectComponent } from './cruds/project/edit-project/edit-project.component';
import { CreateProjectComponent } from './cruds/project/create-project/create-project.component';
import { SkillComponent } from './components/skill/skill.component';
import { EditSkillComponent } from './cruds/skill/edit-skill/edit-skill.component';
import { EducationComponent } from './components/education/education.component';
import { EditEducationComponent } from './cruds/education/edit-education/edit-education.component';
import { CreateEducationComponent } from './cruds/education/create-education/create-education.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditPersonComponent } from './person/edit-person/edit-person.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { ListPersonComponent } from './person/list-person/list-person.component';
import { CreateExperienceComponent } from './cruds/experience/create-experience/create-experience.component';
import { EditExperienceComponent } from './cruds/experience/edit-experience/edit-experience.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { CreateSkillComponent } from './cruds/skill/create-skill/create-skill.component';

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
    path: ':idPerson/experience/create',
    component: CreateExperienceComponent
  },
  {
    path: ':idPerson/experience/edit/:idExperience',
    component: EditExperienceComponent
  },
  {
    path: ':idPerson/experiences',
    component: ExperienceComponent
  },
  {
    path: ':idPerson/education/create',
    component: CreateEducationComponent
  },
  {
    path: ':idPerson/education/edit/:idEducation',
    component: EditEducationComponent
  },
  {
    path: ':idPerson/educations',
    component: EducationComponent
  },
  {
    path: ':idPerson/skill/create',
    component: CreateSkillComponent
  },
  {
    path: ':idPerson/skill/edit/:idSkill',
    component: EditSkillComponent
  },
  {
    path: ':idPerson/skills',
    component: SkillComponent
  },
  {
    path: ':idPerson/project/create',
    component: CreateProjectComponent
  },
  {
    path: ':idPerson/project/edit/:idProject',
    component: EditProjectComponent
  },
  {
    path: ':idPerson/projects',
    component: ProjectComponent
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
