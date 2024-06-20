import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url='http://localhost:5000/api/user' //ruta que se usara para el backend

  constructor(private http:HttpClient) { }

  getUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.url)
  }
  editUsers(user: any): Observable<Users> { 
    return this.http.patch<Users>(this.url, user);
  }
  addUser(product: any):Observable<Users>{
    return this.http.post<Users>(this.url,product)
  }
  deleteUser(id:string):Observable<Users>{
    return this.http.delete<Users>(this.url+'/'+id)
  }
}
