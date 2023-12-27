import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  constructor(private _http: HttpClient) { }

  getLanguage(): Observable<any> {
    const newLocal = 'http://localhost:3000/language';
    return this._http.get(newLocal);
  }

  getSarga(): Observable<any> {
    return this._http.get('http://localhost:3000/sarga');
  }
  getShloka( sargaId: any): Observable<any> {
    return this._http.get('http://localhost:3000/shloka?sargaId=' + sargaId);
  }
}
