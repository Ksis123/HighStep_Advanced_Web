import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { signin } from 'src/app/models/signin';
import { SigninService } from 'src/app/services/signin.service';

import { CartService } from 'src/app/services/cart.service';
import { cateModel } from 'src/app/models/category';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser?: signin;

  uid = localStorage.getItem('currentUser')?.split('id":"')[1].split('","')[0];
  cart: cateModel = [];
  n?: string;
  constructor(
    private router: Router,
    private login: SigninService,
    private cartService: CartService,
    private cus: CustomerService
  ) {
    this.login.currentUser.subscribe((x) => (this.currentUser = x));

    this.cart = this.cartService.getCart();
    this.getCustomerID(this.uid);
  }

  ngOnInit(): void {}

  getCustomerID(tid?: string) {
    try {
      this.cus.getCustomerID(tid).subscribe(
        (data) => {
          this.n = data?.name;
          console.log(this.n);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.login.logout();
    this.router.navigate(['/login']);
    //location.reload();
  }

  getCounter() {
    return this.cartService.getCounter();
  }

  getSumPrice() {
    return this.cartService.getSumPrice();
  }


}
