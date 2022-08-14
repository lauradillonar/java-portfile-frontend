import { Person } from 'src/app/models/person';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from './../../services/contact.service';
import { DataService} from './../../services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfileService } from 'src/app/services/portfile.service';
import Swal from 'sweetalert2';
import { Contact } from 'src/app/models/contact';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [DataService]
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  isEmail = /\S+@\S+\.\S+/;
  
  myPortfile:any;
  lang: any;
  label: any;

  @Input() idPerson?: number;
  textName: string = '';
  textEmail: string = '';
  textMessage: string = '';
  person?: Person;
  hasPerson: boolean = false;

  constructor(
    private labels: PortfileService, 
    private fb: FormBuilder,
    private contactService: ContactService,
    private personService: PersonService,
    private activateRoute: ActivatedRoute,
    private router: Router) 
  { 
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1024)]]
    });
  } 

  ngOnInit(): void {
    this.idPerson = this.activateRoute.snapshot.params['idPerson'];

    this.labels.getData().subscribe(
      data =>{
        this.myPortfile=data;
        this.lang=this.myPortfile.es;
        this.label = this.lang.contact.label;
      },
      err => {
        console.log(err);
      }
    );

    this.getDataPerson(this.idPerson);
  }

  getDataPerson(id?: number): void{
    if(id){
      this.personService.home(id).subscribe(
        data => {
          this.person = data;
          this.hasPerson = true;
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }

  viewMessages(): void{
    if(this.idPerson){
      this.contactService.existsByIdPerson(this.idPerson).subscribe(
        data => {
          if(data){
            this.router.navigate([`${this.idPerson}/contact/list`]);
          } else {
            Swal.fire("No hay mensajes recibidos", "Listo", "success");
          }
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }

  async onSave(): Promise<void> {
    if (this.contactForm.valid){
      try{
        //console.log(this.contactForm.value);
        const formValue = this.contactForm.value;
        
        if(this.idPerson){
          
          this.textName = formValue['name']; 
          this.textEmail = formValue['email'];
          this.textMessage = formValue['message'];

          const contact = new Contact(
            this.idPerson,
            this.textName,
            this.textEmail,
            this.textMessage
          );

          await this.contactService.save(contact).subscribe(
            data => {
              Swal.fire("Mensaje enviado", "Listo", "success");
              this.contactForm.reset();
              this.textName = '';
              this.textEmail = '';
              this.textMessage = '';
            },
            err => {
              Swal.fire("Ops...", err.error.message, "error");
              this.router.navigate([`/${this.idPerson}/home`],{fragment: 'contact'});
            }
          );
        }
      }catch(e){
        Swal.fire("Ops...", ""+e, "error");
      }
    } else {
      //console.log('Not valid');
      Swal.fire("Ops...", "Por favor, verifique los datos ingresados", "error");
    }
  }

  isValidField(field: string):string{
    const validatedField = this.contactForm.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }


  private initForm():void{
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]]
    });
  }
}
