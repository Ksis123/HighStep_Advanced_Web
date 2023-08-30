import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { category, cateModel } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) {}

  menus: any;
  category?: cateModel[];
  submitStatus = false;

  getCategory() {
    return this.http.get<category>('http://localhost:3000/api/category').pipe(
      map((data) => {
        if (data) {
          this.menus = data;
          console.log(this.menus);
        }
        return this.menus;
      })
    );
  }

  getSomeCategory(id: number) {
    return this.menus[id];
  }

  addCategory(data: any) {
    return this.http
      .post<any>('http://localhost:3000/api/addcategory', data)
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

  deleteCategory(id: number) {
    return this.http
      .delete('http://localhost:3000/api/deletecategory/' + id)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  UpdateCategoryID(id: any) {
    //console.log(id);
    return this.http
      .put('http://localhost:3000/api/updatecategory/' + id, { quantity: 1 })
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
