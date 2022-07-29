import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfileService } from 'src/app/services/portfile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [DataService]
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  isEmail = /\S+@\S+\.\S+/;

  constructor(private data: PortfileService, private fb: FormBuilder, private dataSvc: DataService) { 
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1024)]]
    });
  } 

  myPortfile:any;
  lang: any;

  ngOnInit(): void {
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang=this.myPortfile.en;
    });

    // this.initForm();
    
  }

  async onSave(): Promise<void> {
    if (this.contactForm.valid){
      try{
        //console.log(this.contactForm.value);
        const formValue = this.contactForm.value;
        await this.dataSvc.onSaveContact(formValue);
        Swal.fire("Message sent", "See soon!", "success");
        this.contactForm.reset();
      }catch(e){
        alert(e);
      }
    } else {
      //console.log('Not valid');
      Swal.fire("Oops...", "Please check the form data", "error");
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
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1024)]]
    });
  }
}
