import { EditPersonComponent } from './person/edit-person/edit-person.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactGuard } from './guards/contact.guard';
import { ListPersonComponent } from './person/list-person/list-person.component';

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
