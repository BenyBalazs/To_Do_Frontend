import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {Constants} from '../Constants';
import {HttpClient} from '@angular/common/http';
import {AuthRequest} from '../models/AuthRequest';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  username = '';
  password = '';

  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleLogin(): void {

    const user: AuthRequest = {username: this.username, password: this.password};
    this.http.post<string>('http://localhost:9193/api/user/authenticate', user, {  responseType: 'text' as 'json' }).pipe(
      tap(
      data => {
        Constants.username = this.username;
        Constants.token = data;
        Constants.isLoggedIn = true;
        this.router.navigate(['/crud-operations']);
      })
    ).subscribe();

    Constants.isLoggedIn = true;
  }
}
