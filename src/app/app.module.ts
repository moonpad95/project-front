import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './view/product/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductFormComponent } from './view/product/product-form/product-form.component';
import { UsersComponent } from './view/users/users.component';
import { UsersListComponent } from './view/users-list/users-list.component';
import { LoginComponent } from './view/login/login.component';
import { SalesListComponent } from './view/product/sales-list/sales-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFormComponent,
    UsersComponent,
    UsersListComponent,
    LoginComponent,
    SalesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserModule,
MatGridListModule,
FormsModule,
MatMenuModule,
MatListModule,
MatIconModule,
MatTabsModule,
MatCardModule,
MatInputModule,
MatFormFieldModule,
MatTableModule,
MatDialogModule,
ReactiveFormsModule,
MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
