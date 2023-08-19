import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';

const routes: Routes = [
  {path:'Home', component: AboutComponent},
  {path:'guruParampara', component: AboutComponent},
  {path:'courses', component: CourseComponent},
  {path:'thirtaKshetra', component: AboutComponent},
  {path:'articles', component: AboutComponent},
  {path:'aboutus', component: AboutComponent},
  {path: 'add-course',component: CourseAddEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
