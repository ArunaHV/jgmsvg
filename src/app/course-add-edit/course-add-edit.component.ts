import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface courseType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css']
})
export class CourseAddEditComponent {

  events: string[] = [];
   
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  courseForm: FormGroup;
  Types: courseType[] = [
    {value: 'SankGranta', viewValue: 'Sanskrit Granthagalu'},
    {value: 'Veda', viewValue: 'Veda'},
    {value: 'KannGrant', viewValue: 'Kannada Granthagalu'},
    {value: 'Stotragalu', viewValue: 'Stotragalu'}
  ];

  EligiblePersons: string[] = ['Purusharu', 'Mahileyaru','Kids','Boys', ];

  Batches: string[] = ['Daily Morning', 'Daily Evening','Daily Noon','Weekend'];
  constructor(private _fb: FormBuilder){
    this.courseForm = this._fb.group({
      courseName: '',
      courseType: '',
      ApplicableFor: '',
      courseBatch: ''
    })
  }
  onFormSubmit() {
    if(this.courseForm.valid) {
      console.log(this.courseForm.value);
    }
   
  }
}
