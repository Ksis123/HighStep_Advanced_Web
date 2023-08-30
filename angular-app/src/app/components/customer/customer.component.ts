import { Component, OnInit} from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit{

  ListCustomer: any;
  constructor(private customer: CustomerService, private router: Router) {  this.onLoading(); }

  ngOnInit(): void {
  }
  onLoading() {
    try {
      this.customer.getCustomer().subscribe(
        (data) => {
          this.ListCustomer = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  onClick() {
    this.router.navigate(['/category']);
  }

}
