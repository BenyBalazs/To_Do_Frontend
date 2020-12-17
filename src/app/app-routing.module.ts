import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrudOperationsComponent} from './crud-operations/crud-operations.component';
import {LoginFormComponent} from './login-form/login-form.component';

const routes: Routes = [
  {path: 'crud-operations', component: CrudOperationsComponent},
  {path: '', component: LoginFormComponent},
  {path: 'login-form', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
