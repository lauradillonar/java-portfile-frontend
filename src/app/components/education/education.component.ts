import { Education } from './../../models/education';
import { EducationService } from './../../services/education.service';
import Swal from 'sweetalert2';
import { Component, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  constructor(
    private data: PortfileService,
    private educationService: EducationService) { }

  myPortfile:any;
  lang: any;
  items:any = [];
  @Input() idPerson?: number;
  educations: Education[] = [];
  hasEducation: boolean = false;

  ngOnInit(): void {
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang=this.myPortfile.es;
      this.items= this.lang.education.cards;
    });

    this.listEducation();
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
          Swal.fire("Datos de educación borrados", "Listo", "success");
          this.listEducation();
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }
}
