import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from './../../../services/contact.service';
import { PortfileService } from './../../../services/portfile.service';

import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  myPortfile: any;
  lang: any;
  labels: any;
  idPerson!: number;
  messages: Contact[] = [];
  hasMessages: boolean = false;
  textareas!: NodeList;


  constructor(
    private labelService: PortfileService,
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idPerson = this.activatedRoute.snapshot.params['idPerson'];

    this.labelService.getData().subscribe(
      data => {
        this.myPortfile = data;
        this.lang = this.myPortfile.es;
        this.labels = this.lang.contact.label;
      },
      err => {
        console.log(err);
      }
    );

    this.listMessages();
  }

  ngAfterViewChecked(): void {
    this.textareas = document.querySelectorAll(".text");
    this.textareas.forEach(
      (text:any) => {
        text.style.height =text.scrollHeight+'px';
    });
  }

  listMessages(): void{
    
    if(this.idPerson){
      this.contactService.getByPerson(this.idPerson).subscribe(
        data => {
          this.messages = data;
          this.hasMessages = true;
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }

  deleteMessage(idContact?: number): void {
    if(idContact){
      this.contactService.delete(idContact).subscribe(
        data => {
          Swal.fire("Mensaje de contacto borrado", "Listo", "success");
          this.listMessages();
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }
}
