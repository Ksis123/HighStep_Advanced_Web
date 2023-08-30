import { Injectable } from '@angular/core';
import { cateModel } from '../models/category';
import { CategoryService } from './category.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  counter: number = 0;
  sumPrice: number = 0;
  cart: cateModel = [];
  cartid:any = [];


  constructor(private categoryService: CategoryService) { }

  add(id: number){
    console.log('Add product id:'+id+' to cart');
    this.cart.push(this.categoryService.getSomeCategory(id))
    this.cartid.push(this.categoryService.getSomeCategory(id)._id)
    this.sumPrice += this.categoryService.getSomeCategory(id).price
    this.counter = this.cart.length;
  
  }
  getCounter(){
    return this.counter;
  }
  
  getSumPrice(){
    return this.sumPrice}
  
  getCart(){
    return this.cart;
  }
  
  getCartid(){
    return this.cartid;
  }


}
