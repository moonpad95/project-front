import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {

  url='http://localhost:5000/api/product' //ruta que se usara para el backend

  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url)
  }
  editProducts(product:any):Observable<Product[]>{
    return this.http.put<Product>(this.url,product)
  }
  addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.url,product)
  }
  deleteProduct(id:string):Observable<Product>{
    return this.http.delete<Product>(this.url+'/'+id)
  }
}
