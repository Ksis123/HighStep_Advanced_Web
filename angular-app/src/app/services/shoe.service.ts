import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { shoe, shoeModel } from '../models/shoe';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {


  constructor(private http: HttpClient) {}

  menus: any;
  category?: shoeModel[];
  submitStatus = false;

  getShoe() {
    return this.http.get<shoe>('http://localhost:3000/api/shoe').pipe(
      map((data) => {
        if (data) {
          this.menus = data;
          console.log(this.menus);
        }
        return this.menus;
      })
    );
  }

  getSomeShoe(id: number) {
    return this.menus[id];
  }

  addShoe(data: any) {
    return this.http
      .post<any>('http://localhost:3000/api/addshoe', data)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submitStatus = true;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.submitStatus = false;
        },
      });
  }

  deleteShoe(id: number) {
    return this.http
      .delete('http://localhost:3000/api/deleteshoe/' + id)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  UpdateShoeID(id: any) {
    return this.http
      .put('http://localhost:3000/api/updateshoe/' + id, { quantity: 1 })
      .pipe(
        map((data) => {
          if (data) {
            console.log(data);
          }
          return data;
        })
      );
  }

}
