import { ContactComponent } from './../components/contact/contact.component';
import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class ContactGuard implements CanDeactivate<ContactComponent> {
    
    canDeactivate(component: ContactComponent): Observable<boolean> | Promise<boolean> | boolean {
        
        if(component.contactForm.dirty){
            const name = component.contactForm.get("name")?.value || 'Dear user';
            return Swal.fire({
                title: `${name}, do you want to leave without saving?`,
                showCancelButton: true,
                confirmButtonText: "Yes"
            }).then((result:any)=>{
                return result.isConfirmed ? true: false;
            });
        }
    return true;
    }

}