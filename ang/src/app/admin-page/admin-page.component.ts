import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})


export class AdminPageComponent {

  students: any
  curID: any
  realID_: any

  constructor(public http: HttpClient) {}


  ngOnInit()
  {
    this.curID = 1
    this.http.get<any>('http://localhost:3000/students/').subscribe(data => {
      //console.log(data);
      const Name = data.result;
      this.students = Name;
  },
  err => {
    console.log(err.message);
  })
  }





  showInfo(realID: any)
  {
    this.realID_ = realID
    console.log(realID)
    for(var i=0; i < this.students.length; i++)
    {
        console.log("checking: " + this.students[i].ID)
        if(this.students[i].ID === realID)
        {
          this.curID =  i
          break;
        }
    }


  }

 async changeStudent()
  {
    console.log(this.curID)
    var Name = prompt("Введіть нове ім'я студента","0");
    var Surname = prompt("Введіть нове прізвище студента","0");
    var Group = prompt("Введіть групу студента","0");

    var body = { Name: Name, Surname: Surname, Groups_ID: Group}
    this.http.put<any>('http://localhost:3000/students/' + this.realID_, body).subscribe(async data => {this.students = await data});
    console.log(this.students)


  }

  async addStudent()
  {
    alert("Adding student!!!!")
    var ID = prompt("Введіть нове ID студента","0");
    var Name = prompt("Введіть нове ім'я студента","0");
    var Surname = prompt("Введіть нове прізвище студента","0");
    var Group = prompt("Введіть групу студента","0");
    var body = {ID: ID, Name: Name, Surname: Surname, Groups_ID: Group}
    this.http.post<any>('http://localhost:3000/students/', body).subscribe(async data => {this.students = await data});

  }

  async deleteStudent()
  {
    console.log("sssssss")
    if(window.confirm("Do you really want to leave?"))
    {
      this.http.delete<any>('http://localhost:3000/students/' + this.realID_).subscribe(async data => {this.students = await data});

    }


  }
}


