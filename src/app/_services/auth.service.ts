import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const Profile_API= 'http://localhost:8080/api/profile/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, active: boolean): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        active,
      },
      
      httpOptions
    );
  }
  updateUser(firstName: string, lastName: string, phoneNumber: string,username: string,email: string,
    password: string, _id: string) {
      return this.http.post(
        Profile_API + _id,
        {
          firstName,
          lastName,
          phoneNumber,
          username,
          email,
          password,
        },
        httpOptions
      );
    }
    
    refreshToken() {
      return this.http.post(AUTH_API + 'refreshtoken', { }, httpOptions);
    }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}