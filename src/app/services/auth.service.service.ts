import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='http://localhost:5000/api/user/login' //ruta que se usara para el backend

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    console.log('los datos son',data)
    return this.http.post<any>(`${this.url}`, data)
    .pipe(
      tap(user=> localStorage.setItem('token',JSON.stringify(user.token)))
    );
    
  }
}


