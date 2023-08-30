import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { signin } from '../models/signin';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private currentUserSubject: BehaviorSubject<signin>;
  public currentUser: Observable<signin>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<signin>(
      JSON.parse(localStorage.getItem('currentUser') as any)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signIn(dataLogin: any) {
    return this.http
      .post<any>('http://localhost:3000/login/signin', dataLogin)
      .pipe(
        map((data) => {
          if (data && data.token) {
            window.localStorage.setItem('token', data?.token);
            window.localStorage.setItem(
              'currentUser',
              JSON.stringify(data?.result)
            );
          }
          return data;
        })
      );
  }

  public get currentUserValue(): signin {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.currentUserSubject.next(null as any);
  }
}
