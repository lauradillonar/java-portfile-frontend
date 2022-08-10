export class Skill {

    idSkill?: number;
    idPerson: number;
    item: string;
    progress: number;

    constructor(
        idPerson: number,
        item: string,
        progress: number
    ){
        this.idPerson = idPerson;
        this.item = item;
        this.progress = progress;
    }
}
