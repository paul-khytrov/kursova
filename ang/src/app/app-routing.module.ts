import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DbTestComponent } from './db-test/db-test.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [

    {path: '', component: LandingPageComponent},
    {path: 'student', component: DbTestComponent},
    {path: 'lecturer', component: LecturerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
