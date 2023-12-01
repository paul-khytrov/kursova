import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationExtras } from '@angular/router';


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

    const id = prompt("Введіть айді студента","0");
    const navigationExtras: NavigationExtras = {
      state: { id },
    };
    this.router.navigate(['student'], navigationExtras);
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
