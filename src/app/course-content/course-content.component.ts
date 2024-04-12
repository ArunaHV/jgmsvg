import { Component, OnInit } from '@angular/core';
import { CourseContentService } from '../services/course-content.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
[x: string]: any;
  displayedColumns: string[] = ['id', 'language', 'sarga', 'verse', 'version','shloka','pada','padaCheda','padaArtha'];
  languageData: any;
  sargaData: any;
  selectedSarga: any;
  shlokaData: any;
  selectedLanguage: any;
  selectedShloka: any;
  selectedPada: string | null = null;
  jsonData: any;
  shlokaSmvTrAttributes: any;
  shlokaSmvTrAttributesByLanguage: any

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
  
  onLanguageChange(ob: { value: any; }) {
    this.selectedShloka = null;
    this.selectedLanguage = ob.value;
    this.getShloka();
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

  onShlokaChange(ob: { value: any; }) {
    this.selectedShloka = this.shlokaData.find((shloka: { shloka_number: any; }) => shloka.shloka_number === ob);
  
    if (this.selectedShloka) {
      // Assuming shloka_smv_tr_attributes is an array within selectedShloka
      const selectedAttribute = this.selectedShloka.shloka_smv_tr_attributes.find((attribute: any) => attribute.shloka_smv_tr_attribute_id === this.selectedLanguage);
  
      if (selectedAttribute) {
        this.selectedShloka = {
          ...this.selectedShloka,
          selectedAttribute: selectedAttribute
        };
  
        // Check if padacheda is null in selectedAttribute, if yes, use the default attribute
        if (selectedAttribute.padacheda === null) {
          const defaultAttribute = this.selectedShloka.shloka_smv_tr_attributes.find((attribute: any) => attribute.isdefault === true);
          
          if (defaultAttribute) {
            this.selectedShloka.selectedAttribute.padacheda = defaultAttribute.padacheda;
          }
        }
      }
    }
  }
  
  getShlokaText(shlokaId: any): string {
    const selectedShloka = this.shlokaData.find((shloka: { shloka_smv_id: any; }) => shloka.shloka_smv_id === shlokaId);
    return selectedShloka ? selectedShloka.shloka_text : '';
  }
  
  getPadaArray(): { id: number, text: string }[] {
    const padachedaArray = this.selectedShloka.selectedAttribute?.padacheda.split(';');
    return padachedaArray.map((pada: string, index: number) => ({ id: index + 1, text: pada.trim() }));
  }
  
  getAnvayaArray(): { id: number, text: string }[] {
    const padachedaArray = this.selectedShloka.selectedAttribute?.anvaya.split(';');
    return padachedaArray.map((pada: string, index: number) => ({ id: index + 1, text: pada.trim() }));
  }
  getPadaArthaArray(): { id: number, text: string }[] {
    const padachedaArray = this.selectedShloka.selectedAttribute?.pratipada_artha.split('#');
    return padachedaArray.map((pada: string, index: number) => ({ id: index + 1, text: pada.trim() }));
  }

  getShloka(){
    this._courseContentService.getShloka().subscribe({
      next:(res) => {
          this.shlokaData = res;
          this.shlokaData = this.getShlokasByLanguage();
      },
      error: console.log,
    })
  }

  public getShlokasByLanguage(){
    this.shlokaData.subscribe((data: { [x: string]: any; }) => {
      this.jsonData = data['shloka'];
      this.shlokaSmvTrAttributes = this.jsonData[0]['shloka_smv_tr_attributes'];
      this.shlokaSmvTrAttributesByLanguage = this.shlokaSmvTrAttributes.filter((l : any) =>{
        return l.language_code_id == this.selectedLanguage && l.shloka_smv_id == this.selectedSarga
      })
    });
  }
  concatenateText(): string {
    return this.getPadaArthaArray().map(item => item.text).join('\n');
}
  toggleDrawer(padaText: string): void {
    this.selectedPada = padaText;
    this['drawer'].toggle();
  }
  
}

