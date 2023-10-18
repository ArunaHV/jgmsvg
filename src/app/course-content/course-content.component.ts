import { Component, OnInit } from '@angular/core';
import { CourseContentService } from '../services/course-content.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'language', 'sarga', 'verse', 'version','shloka','pada','padaCheda','padaArtha'];
  languageData: any;
  sargaData: any;
  selectedSarga: any;
  shlokaData: any;
  constructor(private _courseContentService: CourseContentService) {}
  public modeselect = 'Kannada';
  ngOnInit(): void {
    
    this.getLanguage();
    this.getSarga();
    this.getShloka();
  }
  
  getLanguage(){
    this._courseContentService.getLanguage().subscribe({
      next:(res) => {
          this.languageData = res;
      },
      error: console.log,
    })
  }
  
  onSargaChange(ob: { value: any; }) {
    this.selectedSarga = ob.value;
    this.getShloka();
  }
  getSarga(){
    this._courseContentService.getSarga().subscribe({
      next:(res) => {
          this.sargaData = res;
      },
      error: console.log,
    })
  }

  getShloka(){
    this._courseContentService.getShloka(this.selectedSarga).subscribe({
      next:(res) => {
          this.shlokaData = res;
      },
      error: console.log,
    })
  }
}

