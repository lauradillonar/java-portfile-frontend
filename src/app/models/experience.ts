export class Experience {
    idExperience?: number;
    idPerson: number;
    title: string;
    subtitle: string;
    when: string;
    where: string;
    text?: string;
    link1?: string;
    url1?: string;
    link2?: string;
    url2?: string;
    link3?: string;
    url3?: string;

    constructor(
        idPerson: number,
        title: string,
        subtitle: string,
        when: string,
        where: string,
        text?: string,
        link1?: string,
        url1?: string,
        link2?: string,
        url2?: string,
        link3?: string,
        url3?: string
    ){
        this.idPerson = idPerson;
        this.title = title;
        this.subtitle = subtitle;
        this.when = when;
        this.where = where;
        this.text = text;
        this.link1 = link1;
        this.url1 = url1;
        this.link2 = link2;
        this.url2 = url2;
        this.link3 = link3;
        this.url3 = url3;
    }
}
