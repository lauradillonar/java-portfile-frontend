import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HelloComponent } from './components/hello/hello.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ContactGuard } from './guards/contact.guard';
import { BlogComponent } from './components/blog/blog.component';
import { ListPersonComponent } from './person/list-person/list-person.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { EditPersonComponent } from './person/edit-person/edit-person.component';
import { SkillsComponent } from './components/skills/skills.component';
import { CreateExperienceComponent } from './cruds/experience/create-experience/create-experience.component';
import { EditExperienceComponent } from './cruds/experience/edit-experience/edit-experience.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HelloComponent,
    AboutmeComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    ListPersonComponent,
    CreatePersonComponent,
    EditPersonComponent,
    SkillsComponent,
    CreateExperienceComponent,
    EditExperienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AngularFirestore, ContactGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
