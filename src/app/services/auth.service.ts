import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  apiUrl = 'http://localhost:3000';

  http = inject(HttpClient);

  initRegister(username: any){
    return this.http.post(this.apiUrl + '/init-register', {username});
    }

    verifyRegister(optionsJSON: any, attResp: any) {
      const body = { optionsJSON, attResp };
      return this.http.post(this.apiUrl + '/verify-register', body);
    }
}
