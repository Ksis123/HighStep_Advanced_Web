import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { ManageComponent } from './components/manage/manage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { ShoeComponent } from './components/shoe/shoe.component';
import { CartComponent } from './components/cart/cart.component';
import { AddshoeComponent } from './components/addshoe/addshoe.component';
import { CustomerComponent } from './components/customer/customer.component';



@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    NavbarComponent,
    MainComponent, 
    HomeComponent, 
    ShowDetailsComponent,
    ManageComponent, 
    ProfileComponent, 
    SignupComponent,
    ShoeComponent,
    CustomerComponent, 
    CartComponent, AddshoeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
