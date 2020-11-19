import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class infoTabla {
  error: any;

  constructor(private http: HttpClient) { }

  getInfo(): Observable<any[]>{
      return this.http.get<any[]>('assets/info.json');
  }
}
