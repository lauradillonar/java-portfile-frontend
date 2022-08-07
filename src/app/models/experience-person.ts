import { Experience } from './experience';
export class ExperiencePerson {

    experience: Experience;
    idPerson: number;

    constructor(experience: Experience, idPerson: number){
        this.experience = experience;
        this.idPerson = idPerson;
    }

}
