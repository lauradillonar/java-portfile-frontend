export class Person {
    idPerson?: number;
    name: string;
    lastname: string;
    userName: string;
    birthdate: string;
    nationality: string;
    email: string;
    password: string;
    phone: string;
    aboutMeSub: string;
    aboutMe: string;
    job: string;
    location: string;
    authorities: string[]=[];
    imageHeader?: string;
    image?: string;
    logoSrc?: string;
    logoAlt?: string;
    logoUrl?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    
    
    constructor(
        name: string,
        lastname: string,
        userName: string,
        birthdate: string,
        nationality: string,
        email: string,
        password: string,
        phone: string,
        aboutMeSub: string,
        aboutMe: string,
        job: string,
        location: string,
        authorities: string[],
        imageHeader?: string,
        image?: string,
        logoSrc?: string,
        logoAlt?: string,
        logoUrl?: string,
        facebook?: string,
        instagram?: string,
        twitter?: string
    ){
        this.name = name;
        this.lastname = lastname;
        this.userName = userName;
        this.birthdate = birthdate;
        this.nationality = nationality;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.aboutMeSub = aboutMeSub;
        this.aboutMe = aboutMe;
        this.job = job;
        this.location = location;
        this.authorities = authorities;
        this.imageHeader = imageHeader;
        this.image = image;
        this.logoSrc = logoSrc;
        this.logoAlt = logoAlt;
        this.logoUrl = logoUrl;
        this.facebook = facebook;
        this.instagram = instagram;
        this.twitter = twitter;
    }

}
