import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fragm: any;

  constructor(private readonly router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.fragment.subscribe((param)=>{
      this.fragm = param;
      console.log(this.fragm);
    });
  }

}
