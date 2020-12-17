import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../Constants';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    Constants.isLoggedIn = false;
    Constants.username = '';
    Constants.token = '';
    this.router.navigate(['/login-form']);

  }
}
