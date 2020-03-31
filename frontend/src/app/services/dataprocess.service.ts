import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class DataprocessService {
   private url  = 'http://localhost:4000';
   private  categoryUrl = '/category/';
   private  productUrl = '/product/';

  constructor(private http:HttpClient) { }
  
  //category functions start
  addCategory(category: Category){
    return this.http.post(this.url + this.categoryUrl + 'create',category)
  }

  listCategory(pageNo){
    return this.http.get(this.url + this.categoryUrl +  `list/${pageNo}`)
  }

  editCategoryView(id){
    return this.http.get(this.url + this.categoryUrl + `edit/${id}`)
  }

  editCategory(category: Category,id){
    return this.http.put(this.url + this.categoryUrl + `edit/${id}`,category)
  }

  deleteCategory(id){
    return this.http.delete(this.url + this.categoryUrl + `delete/${id}`)
  }
  //category functions end

  //product functions start
  addProduct(product: Product){
    return this.http.post(this.url + this.productUrl + 'create',product)
  }
  listProduct(pageNo){
    return this.http.get(this.url + this.productUrl +  `list/${pageNo}`)
  }
  editProductView(id){
    return this.http.get(this.url + this.productUrl + `edit/${id}`)
  }
  editProduct(product: Product,id){
    return this.http.put(this.url + this.productUrl + `edit/${id}`,product)
  }
  deleteProduct(id){
    return this.http.delete(this.url + this.productUrl + `delete/${id}`)
  }
  //product functions end

}
