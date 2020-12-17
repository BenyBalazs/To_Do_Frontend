import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterDialog} from '../register/register.component';
import {ToDoData} from '../models/ToDoData';
import {Observable} from 'rxjs';
import {Constants} from '../Constants';
import {Difficulty} from '../models/Difficulty';
import {NewToDoRequest} from '../models/NewToDoRequest';

const ELEMENT_DATA: ToDoData[] = [
  {id: 1560608769632, title: 'Artificial Intelligence', dueDate: new Date(Date.now())},
  {id: 1560608796014, title: 'Machine Learning', dueDate: new Date(Date.now())},
  {id: 1560608787815, title: 'Robotic Process Automation', dueDate: new Date(Date.now())},
  {id: 1560608805101, title: 'Blockchain', dueDate: new Date(Date.now()) }];

@Component({
  selector: 'app-crud-operations',
  templateUrl: './crud-operations.component.html',
  styleUrls: ['./crud-operations.component.css']
})
export class CrudOperationsComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['id', 'title', 'duedate', 'action'];

  constructor(public editDialog: MatDialog,
              public deleteDialog: MatDialog,
              public addDialog: MatDialog,
              private http: HttpClient,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData(): void {
    const tokenStr = 'Bearer ' + Constants.token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    this.http.get<ToDoData[]>('http://localhost:9193/api/todo/getAllByUserName/?username=' + Constants.username, {headers})
      .subscribe(
        data => {
          this.dataSource = data;
          this.changeDetectorRefs.detectChanges();
        }
      );
  }

  openEditDialog(element: ToDoData): void {
    const dialogRef = this.editDialog.open(EditDialog, {
      width: '300px',
      data: element
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTableData();
    });
  }

  openDeleteDialog(idP: number): void {
    const dialogRef = this.deleteDialog.open(DeleteDialog, {
      width: '300px',
      data: idP
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTableData();
      this.changeDetectorRefs.detectChanges();
    });
  }

  handleNewToDo(): void {
    const dialogRef = this.addDialog.open(AddDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTableData();
      this.changeDetectorRefs.detectChanges();
    });
  }
}
@Component({
  selector: 'add-dialog',
  templateUrl: '../crud-operations/add-dialog.html',
  styleUrls: ['../crud-operations/add-dialog.css']
})
export class AddDialog implements OnInit{
  title: any;
  dueDate: any;
  editFail: any;
  errorMessage: any;
  editSuccess: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  handleSave() {
    const todo: NewToDoRequest = {id: undefined, title: this.title, dueDate: this.dueDate };
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Constants.token);
    this.http.
    post<string>('http://localhost:9193/api/todo/addNew/?username=' + Constants.username, todo, {headers})
      .subscribe(
        () => {
          this.editFail = false;
          this.editSuccess = true;
        },
        message => {
          this.editFail = true;
          this.editSuccess = false;
          this.errorMessage = message.toString();
        }
      );
  }
}
@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html',
  styleUrls: ['./edit-dialog.css']
})
export class EditDialog implements OnInit{

  id = 0;
  title = '';
  dueDate = new Date(Date.now());
  editFail: any;
  editSuccess: any;
  difficulties = Constants.diff;
  errorMessage: any;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ToDoData) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.title = this.data.title;
    this.dueDate = this.data.dueDate;
  }

  handleSave(): void {
    const edited: ToDoData = {id: this.id, title: this.title, dueDate: this.dueDate };
    const tokenStr = 'Bearer ' + Constants.token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    this.http.put<string>('http://localhost:9193/api/todo/editItem/?username=' + Constants.username, edited, {headers})
      .subscribe(
        () => {
          this.editFail = false;
          this.editSuccess = true;
          },
        (message) => {
          this.editSuccess = false;
          this.editFail = true;
          this.errorMessage = message; }
      );
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  styleUrls: ['./delete-dialog.css']
})
export class DeleteDialog{

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public id: number) {}

  handleYes(): boolean {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Constants.token);
    this.http.
    delete<string>('http://localhost:9193/api/todo/deleteItem/?username=' + Constants.username + '&id=' + this.id, { headers })
      .subscribe();
    this.dialogRef.close();
    return true;
  }

  handleNo(): boolean {
      this.dialogRef.close();
      return false;
  }
}
