import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { SigninService } from 'src/app/services/signin.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  loading = false;
  submitted = false;
  returnUrl?: string;

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  show!: boolean;
  signup!: string;

  constructor(
    private signin: SigninService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.signin.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.show = false;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signIn() {
    this.submitted = true;
    //console.log(this.signinForm.value);

    if (this.signinForm.invalid) {
      return;
    }

    this.loading = true;
    this.signin
      .signIn(this.signinForm.value)
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        if (data.status) {
          alert('คุณ ' + data?.result?.name + ' เข้าสู่ระบบเรียบร้อยแล้ว');
          this.router.navigate([this.returnUrl]);
          //this.router.navigate(['/']);
          location.reload();
        } else {
          alert('อีเมลและรหัสผ่านไม่ถูกต้อง');
          this.loading = false;
        }
      });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  onClick() {
    this.show = !this.show;
    if (this.show) {
      this.signup = "signup"
    }
  }
}
