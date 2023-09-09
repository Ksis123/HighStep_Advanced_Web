import { Injectable } from '@angular/core';
import { shoeModel } from '../models/shoe';
import { ShoeService } from './shoe.service';

@Injectable({providedIn: 'root'})

export class CartService {
 
  counter: number = 0;
  sumPrice: number = 0;
  cart: shoeModel = [];
  cartid:any = [];

  constructor(private shoeService: ShoeService) { }


add(id: number){
  console.log('Add product id:'+id+' to cart');
  this.cart.push(this.shoeService.getSomeShoe(id))
  this.cartid.push(this.shoeService.getSomeShoe(id)._id)
  this.sumPrice += this.shoeService.getSomeShoe(id).price
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