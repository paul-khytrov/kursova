import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DbTestComponent } from './db-test/db-test.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [

    {path: '', component: LandingPageComponent},
    {path: 'student', component: DbTestComponent},
    {path: 'lecturer', component: LecturerComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'admin/adminPage', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
