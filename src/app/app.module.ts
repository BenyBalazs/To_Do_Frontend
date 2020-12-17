import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RegisterDialog } from './register/register.component';
import {AddDialog, EditDialog} from './crud-operations/crud-operations.component';
import { DeleteDialog} from './crud-operations/crud-operations.component';
// web
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { CrudOperationsComponent } from './crud-operations/crud-operations.component';
import { RegisterService} from './register/register.service';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterDialog,
    LogoutComponent,
    CrudOperationsComponent,
    DeleteDialog,
    EditDialog,
    AddDialog
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
