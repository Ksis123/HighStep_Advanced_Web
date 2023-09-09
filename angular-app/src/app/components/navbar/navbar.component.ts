import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { login } from 'src/app/models/login';
import { CartService } from 'src/app/services/cart.service';
import { shoeModel } from 'src/app/models/shoe';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser?: login;

  uid = localStorage.getItem('currentUser')?.split('id":"')[1].split('","')[0];
  cart: shoeModel = [];
  n?: string;
  constructor(
    private router: Router,
    private login: LoginService,
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
    
  }

  getCounter() {
    return this.cartService.getCounter();
  }

  getSumPrice() {
    return this.cartService.getSumPrice();
  }

}
