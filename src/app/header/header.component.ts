import { Component, OnInit } from '@angular/core';
import {Constants} from '../Constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false ;
  username = 'Constants.username';

  constructor() {
  }

  ngOnInit(): void {
    this.isLoggedIn = Constants.isLoggedIn;
    this.username = Constants.username;
  }

}
