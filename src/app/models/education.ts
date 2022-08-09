export class Education {
    idEducation?: number;
    idPerson: number;
    title: string;
    when: string;
    subtitle: string;
    text1?: string;
    link?: string;
    url?: string;
    text2?: string;
    viewmore?: string;

    constructor(
        idPerson: number,
        title: string,
        when: string,
        subtitle: string,
        text1: string,
        link: string,
        url: string,
        text2: string,
        viewmore: string
    ){
        this.idPerson= idPerson;
        this.title = title;
        this.when= when;
        this.subtitle = subtitle;
        this.text1 = text1;
        this.link = link;
        this.url = url;
        this.text2 = text2;
        this.viewmore = viewmore;
    }
}
