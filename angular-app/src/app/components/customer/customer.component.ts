import { Component, NgModule, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  ListCustomers: any;
  constructor(private customer: CustomerService, private router: Router) { this.onLoading(); }

  ngOnInit(): void {
    
  }
  onLoading() {
    try {
      this.customer.getCustomer().subscribe(
        (data) => {
          this.ListCustomers = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}