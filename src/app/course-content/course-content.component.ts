import { Component, OnInit } from '@angular/core';
import { CourseContentService } from '../services/course-content.service';
import { Observable } from 'rxjs';

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
  defaultShloka: any;
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
    this.getSarga();
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
    this.selectedShloka = this.shlokaData.find((shloka: { shloka_smv_id: any; }) => shloka.shloka_smv_id === ob);
    
    if (this.selectedShloka) {
      // Assuming shloka_smv_tr_attributes is an array within selectedShloka
      const selectedAttribute = this.selectedShloka;
       // Find the default shloka within jsonData[0]
      this.defaultShloka = this.getDefaultAttribute()
       if (selectedAttribute) {
         this.selectedShloka = {
           ...this.selectedShloka,
           selectedAttribute: selectedAttribute
         };
  
      }
    }
  }
  
  getShlokaText(shlokaId: number): string {
    const selectedShloka = this.shlokaData.find((shloka: { shloka_smv_id: any; }) => shloka.shloka_smv_id === shlokaId);
    return selectedShloka ? selectedShloka.shloka_text : '';
  }
  
  getPadaArray(): { id: number, text: string }[] {
    if(this.selectedShloka.selectedAttribute?.padacheda === null)
      this.selectedShloka.selectedAttribute.padacheda = this.defaultShloka.padacheda;
    const padachedaArray = this.selectedShloka.selectedAttribute?.padacheda.split(';');
    return padachedaArray.map((pada: string, index: number) => ({ id: index + 1, text: pada.trim() }));
  }
  
  getAnvayaArray(): { id: number, text: string }[] {
    if(this.selectedShloka.selectedAttribute?.anvaya === null)
      this.selectedShloka.selectedAttribute.anvaya = this.defaultShloka.anvaya;
    const padachedaArray = this.selectedShloka.selectedAttribute?.anvaya.split(';');
    return padachedaArray.map((pada: string, index: number) => ({ id: index + 1, text: pada.trim() }));
  }
  getPadaArthaArray(): { id: number, text: string }[] {
    if(this.selectedShloka.selectedAttribute?.pratipada_artha === null)
      this.selectedShloka.selectedAttribute.pratipada_artha = this.defaultShloka.pratipada_artha;
    const padachedaArray = this.selectedShloka.selectedAttribute?.pratipada_artha.split('#');
    return padachedaArray.map((pada: string, index: number) => ({ id: index + 1, text: pada.trim() }));
  }

  getBhavaprakashika(): string {
    if(this.selectedShloka.selectedAttribute?.vyakhyana_bhavaprakashika === null)
       this.selectedShloka.selectedAttribute.vyakhyana_bhavaprakashika = this.defaultShloka.vyakhyana_bhavaprakashika;
    return this.selectedShloka.selectedAttribute.vyakhyana_bhavaprakashika;
  }
  
  getPadarthadipikodbodhika(): string {
    if(this.selectedShloka.selectedAttribute?.vyakhyana_padarthadipikodbodhika === null)
       this.selectedShloka.selectedAttribute.vyakhyana_padarthadipikodbodhika = this.defaultShloka.vyakhyana_padarthadipikodbodhika;
    return this.selectedShloka.selectedAttribute.vyakhyana_padarthadipikodbodhika;
  }

  getMandopakarini(): string {
    if(this.selectedShloka.selectedAttribute?.vyakhyana_mandopakarini === null)
       this.selectedShloka.selectedAttribute.vyakhyana_mandopakarini = this.defaultShloka.vyakhyana_mandopakarini;
    return this.selectedShloka.selectedAttribute.vyakhyana_mandopakarini;
  }
  
  getPatanotes(): string {
    if(this.selectedShloka.selectedAttribute?.Pata_Notes === null)
       this.selectedShloka.selectedAttribute.Pata_Notes = this.defaultShloka.Pata_Notes;
    return this.selectedShloka.selectedAttribute.Pata_Notes;
  }

  getTatparya(): string {
    if(this.selectedShloka.selectedAttribute?.tatparya === null)
       this.selectedShloka.selectedAttribute.tatparya = this.defaultShloka.tatparya;
    return this.selectedShloka.selectedAttribute.tatparya;
  }

  public getJSON(): Observable<any> {
    return this._courseContentService.getShloka();
  }
  public getShloka(){
    this.getJSON().subscribe({
      next:(res) => {

          this.getShlokasByLanguage();
      },
      error: console.log,
    })
  }

  public getShlokasByLanguage(){
    this.getJSON().subscribe(data => {
      this.jsonData = data;
      this.shlokaSmvTrAttributes = this.jsonData[0]['shloka_smv_tr_attributes'];
      this.shlokaData = this.shlokaSmvTrAttributes.filter((l : any) =>{
        return l.language_code_id == this.selectedLanguage 
      })
    });
  }

  // Define a function to get the default attribute of a shloka by its ID
getDefaultAttribute(): any {
  // Find the shloka by its ID
  return this.shlokaSmvTrAttributes.find((shloka: any) => shloka.isdefault === true) || null;
}
  concatenateText(): string {
    return this.getPadaArthaArray().map(item => item.text).join('\n');
}
  toggleDrawer(padaText: string): void {
    this.selectedPada = padaText;
    this['drawer'].toggle();
  }
  
}

