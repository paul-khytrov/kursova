import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})


export class LandingPageComponent {

  constructor(
    private router: Router
  ) { }

  studentPage()
  {
    this.router.navigate(['student']);
  }
  adminPage()
  {
      alert("admin")
  }
  lecturerPage()
  {
      alert("lectuer")
  }
}
