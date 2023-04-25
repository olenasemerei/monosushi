import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductResponse, IProductRequest } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<IProductResponse>{
  public url = environment.BACKEND_URL
  public api = {products:`${this.url}/products`}
  constructor(
    private http:HttpClient
  ) { }
  getAll():Observable<IProductResponse[]>{
    return this.http.get<IProductResponse[]>(this.api.products)
  }
  getAllByCategore(category:string):Observable<IProductResponse[]>{
    return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${category}`)
  }
  getOne(id:number):Observable<IProductResponse>{
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`)
  }
  create(products:IProductRequest):Observable<IProductResponse>{
    return this.http.post<IProductResponse>(this.api.products, products)
    }
    update(products:IProductRequest, id:number):Observable<IProductResponse>{
      return this.http.patch<IProductResponse>(`${this.api.products}/${id}`,products)
    }
    delete(id:number):Observable<void>{
      return this.http.delete<void>(`${this.api.products}/${id}`)
     }
     resolve(act:ActivatedRouteSnapshot): Observable<IProductResponse>{
      return this.http.get<IProductResponse>(`${this.api.products}/${act.paramMap.get('id')}`)
     }
}
