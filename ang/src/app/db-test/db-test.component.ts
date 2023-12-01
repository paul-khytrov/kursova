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
  student: any;

  data:string= '';

  constructor(private http: HttpClient) {


  }





  ngOnInit()
  {
    const s = history.state;
    const id = Number(s.id);
    console.log(s);

    // Simple GET request with response type <any>
    this.http.get<any>('http://localhost:3000/students/' + id).subscribe(data => {
          //console.log(data);
          const Name = data.result.Name + ' ' + data.result.Surname;
          this.student = Name;
      },
      err => {
        console.log(err.message);
      })
      this.http.get<any>('http://localhost:3000/courses/' + id).subscribe(data => {
        //console.log(data);
        this.courses = data.result;

    },
    err => {
      console.log(err.message);
    })
    }

  }






