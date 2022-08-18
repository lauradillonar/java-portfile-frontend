import { Observable } from 'rxjs';
export class Project {

    idProject?: number;
    idPerson: number;
    title: string;
    fontawesome?: string;
    letter?: string;
    text?: string;
    viewmore?: string;

    constructor(
        idPerson: number,
        title: string,
        fontawesome: string,
        letter: string,
        text: string,
        viewmore: string
    ){
        this.idPerson = idPerson;
        this.title = title;
        this.fontawesome = fontawesome;
        this.letter = letter;
        this.text = text;
        this.viewmore = viewmore;
    }
}
