import { Component } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-db-test',
  templateUrl: './db-test.component.html',
  styleUrls: ['./db-test.component.css']
})
export class DbTestComponent {
  courses : any;
  constructor(private http: HttpClient) { }


  letters = '0123456789ABCDEF';
  color = '#';

  ngOnInit() 
  {      
    // Simple GET request with response type <any>
    this.http.get<any>('http://localhost:3000/').subscribe(data => {
        console.log(data)
        this.courses = data.thedata.courses
    },
    err => {
      console.log(err.message);
    })
    this.color = '#'; // <-----------
    for (var i = 0; i < 6; i++) {
        this.color += this.letters[Math.floor(Math.random() * 16)];
    }

  }
  getRandomColor() {
    
}

  coverExist()
  {
      this.http.get<any>('http://localhost:3000/').subscribe(data => {
      console.log(data)
      this.courses = data.thedata.courses
      if(typeof data.thedata.courses.cover == "undefined"){return false;}
      else return true;

    },
    err => {
      console.log(err.message);
    })
    
  }


}
