import { PersonService } from './../../services/person.service';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { Education } from './../../models/education';
import { EducationService } from './../../services/education.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  constructor(
    private data: PortfileService,
    private educationService: EducationService,
    private router: Router,
    private tokenService: TokenService,
    private personService: PersonService) { }

  myPortfile:any;
  lang: any;
  items:any = [];
  @Input() idPerson?: number;
  educations: Education[] = [];
  hasEducation: boolean = false;
  textareas!: NodeList;
  isLogged: boolean = false;
  idPersonLogged?: number;
  isPersonLogged: boolean = false;
  userName: string = '';
  

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      if(this.userName){
        this.personService.getId(this.userName).subscribe(
          id => {
            this.idPersonLogged = id;
            this.isPersonLogged = true;
            console.log(this.idPersonLogged);
          }
        );  
      }
    }else{
      this.isLogged = false;
      this.userName = '';
    }

    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang=this.myPortfile.es;
      this.items= this.lang.education.cards;
    },
    err => {
      console.log(err);
    });

    this.listEducation();
  }

  ngAfterViewChecked(): void {
    this.textareas = document.querySelectorAll(".text");
    this.textareas.forEach(
      (text:any) => {
        text.style.height =text.scrollHeight+'px';
    });
  }

  listEducation(): void{

    if (this.idPerson){
      this.educationService.getByPerson(this.idPerson).subscribe(
        data => {
          this.educations = data;
          this.hasEducation = true;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  deleteEducation(idEducation?: number): void {
    if(idEducation){
      this.educationService.delete(idEducation).subscribe(
        data => {
          Swal.fire("Datos de educaci??n borrados", "Listo", "success");
          this.listEducation();
          this.router.navigate([`/${this.idPerson}/home`]);
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }
}



