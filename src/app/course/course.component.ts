import { Component } from '@angular/core';
import courseData from   '../../assets/course.json'
import { Course } from './courses';
import { Route, Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseAddEditComponent } from '../course-add-edit/course-add-edit.component';
import { CourseContentComponent } from '../course-content/course-content.component';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  displayedColumns: string[] = ['id', 'Name', 'Type', 'Eligibility', 'Batch'];
  courseDataSource = courseData;

  constructor(private _dialog: MatDialog) {}
  openAddEditEmpForm() {
    this._dialog.open(CourseAddEditComponent);
  }
 
}
