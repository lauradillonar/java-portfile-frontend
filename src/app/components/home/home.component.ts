import { Observable, repeat, Subscription, take } from 'rxjs';
import { InfoService } from './../../services/info.service';
import  Swal  from 'sweetalert2';
import { Person } from './../../models/person';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  person?: Person;
  idPerson?: number;
  isPerson: boolean = false;
  num!: number;


  constructor(
    private router: Router,
    private infoService: InfoService) { }

  ngOnInit(){
    
    this.infoService.idSelected$.subscribe(
      id => {
        alert(id);
      }
    );
  
  } 

  greet(){
    alert("Enviando mensaje...");
  }
}
