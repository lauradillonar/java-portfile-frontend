import { PersonGuardService as guard } from './guards/person-guard.service';
import { LoginPersonComponent } from './person/login-person/login-person.component';
import { ListContactComponent } from './cruds/contact/list-contact/list-contact.component';
import { ContactComponent } from './components/contact/contact.component';
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
    path:'login',
    component: LoginPersonComponent
  },
  {
    path:'create', 
    component: CreatePersonComponent
  },
  {
    path:'edit/:idPerson',
    component: EditPersonComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/home', 
    component: HomeComponent
  },
  {
    path: ':idPerson/experience/create',
    component: CreateExperienceComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/experience/edit/:idExperience',
    component: EditExperienceComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/experiences',
    component: ExperienceComponent
  },
  {
    path: ':idPerson/education/create',
    component: CreateEducationComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/education/edit/:idEducation',
    component: EditEducationComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/educations',
    component: EducationComponent
  },
  {
    path: ':idPerson/skill/create',
    component: CreateSkillComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/skill/edit/:idSkill',
    component: EditSkillComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/skills',
    component: SkillComponent
  },
  {
    path: ':idPerson/project/create',
    component: CreateProjectComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/project/edit/:idProject',
    component: EditProjectComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/projects',
    component: ProjectComponent
  },
  {
    path: ':idPerson/contact/list',
    component: ListContactComponent,
    canActivate: [guard], data: {expectedRole: ['admin','user']}
  },
  {
    path: ':idPerson/contact',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    useHash: false,
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

