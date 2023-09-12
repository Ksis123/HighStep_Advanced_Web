import { Component, OnInit } from '@angular/core';
import { ShoeService } from 'src/app/services/shoe.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  ListShoe: any;
  status?: any;
  constructor(private router: Router, private shoe: ShoeService) {}

  ngOnInit(): void {
    this.onLoading();
  }

  deleteShoe(item: any) {
    alert('Remove Menu Successfully..');
    this.shoe.deleteShoe(item);
  }

  onClick() {
    this.router.navigate(['/addshoe']);
  }
  onLoading() {
    try {
      this.shoe.getShoe().subscribe(
        (data) => {
          this.ListShoe = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  onRowClick(row: any) {
    console.log(row._id);
    this.status = row._id;
  }
}
