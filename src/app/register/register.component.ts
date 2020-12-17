import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {User} from '../models/User';
import {RegisterService} from './register.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    const dialogRef = this.dialog.open(RegisterDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'register-dialog',
  templateUrl: 'register-dialog.html',
  styleUrls: ['./register-dialog.css']
})
export class RegisterDialog {
  usernameLocal = '';
  email = '';
  passwordLocal = '';
  registerFail = false;
  registerSuccess = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<RegisterDialog>,
    private regService: RegisterService ) {}

  handleRegister(): void {
    const user: User = { username: this.usernameLocal, email: this.email, password: this.passwordLocal };
    //this.regService.register(user);
    this.http.post<string>('http://localhost:9193/api/user/register', user, {  responseType: 'text' as 'json' }).pipe(
      tap(
        data => {
          this.registerSuccess = true;
          this.registerFail = false;
        },
        error => {
          this.registerSuccess = false;
          this.registerFail = true;
          this.errorMessage = error;
        }
      )
    ).subscribe();
    //  .subscribe(() => {
     //   this.registerFail = false;
    //    this.registerSuccess = true;
    //    },
    //    error => {
    //      this.registerFail = true;
    //      this.registerSuccess = false;
   //       this.errorMessage = error.toString();
   //     }
    //    );

  }
}
