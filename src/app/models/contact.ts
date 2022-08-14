export class Contact {
    idContact?: number;
    idPerson: number;
    textName: string;
    textEmail: string;
    textMessage: string;

    constructor(
        idPerson: number,
        textName: string,
        textEmail: string,
        textMessage: string
    ){
        this.idPerson = idPerson;
        this.textName = textName;
        this.textEmail = textEmail;
        this.textMessage = textMessage;
    }
}
