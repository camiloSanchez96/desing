import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';

interface UserInfo {
  idccms: number;
  nombre: string;
  refreshToken: string;
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: any;

  constructor(private http: HttpClient) { }


  login(user) {
    const path = environment.apiUrl + '/api/ccmslogin';
    const info = btoa(JSON.stringify(user));
    return this.http.post(path, { body: 's' + info });
  }


  setUser(info) {
    localStorage.setItem('info', CryptoJS.AES.encrypt(JSON.stringify(info), moment(new Date()).format('YYYY-MM-DD')).toString());
  }

  getUser(): UserInfo {
    try {
      return JSON.parse(
        CryptoJS.AES.decrypt(localStorage.getItem('info'), moment(new Date()).format('YYYY-MM-DD')).toString(CryptoJS.enc.Utf8));
    } catch (error) {
      this.logout();
    }
  }

  logout() {
    localStorage.clear();
  }

  relogin(user) {
    localStorage.removeItem('info');
    localStorage.setItem('info', JSON.stringify(user));
    return true;
  }
}
