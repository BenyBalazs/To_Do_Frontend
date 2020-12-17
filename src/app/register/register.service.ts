import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: User): any {
    return this.http.post('http://localhost:9193/register', user).subscribe();
  }
}
