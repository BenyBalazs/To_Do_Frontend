import {Difficulty} from './models/Difficulty';
import {HttpHeaders} from '@angular/common/http';

export abstract class Constants{

  private static _username = '';
  private static _isLoggedIn = false;
  private static _token: string;
  public static readonly diff: Difficulty[] = [
    {name: 'Könnyű', value: 0},
    {name: 'Közepes', value: 1},
    {name: 'Nehéz', value: 2}
  ];

  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    observe: 'response'
  };

  static get username(): string {
    return this._username;
  }

  static set username(value: string) {
    this._username = value;
  }

  static get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  static set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  static get token(): string {
    return this._token;
  }

  static set token(value: string) {
    this._token = value;
  }
}
