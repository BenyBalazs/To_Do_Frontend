import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Constants} from '../Constants';
import {ToDoData} from '../models/ToDoData';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http: HttpClient) { }

  getToDoList(): Observable<any> {
    return this.http.get(environment.apiUrl + 'getAllByUserName/' + 'username=' + Constants.username);
  }

}
