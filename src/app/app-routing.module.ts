import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactGuard } from './guards/contact.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "#contact", 
    component: HomeComponent,
    canDeactivate: [ContactGuard]
  },
  {
    path: "blog",
    component: BlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
