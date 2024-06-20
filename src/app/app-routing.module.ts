import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './view/product/product-list/product-list.component';
import { UsersListComponent } from './view/users-list/users-list.component';
import { LoginComponent } from './view/login/login.component';

const routes: Routes = [
  {path:"", redirectTo:"dashboard", pathMatch:"full"},
  {path:"productos" ,component:ProductListComponent},
  {path:"users", component:UsersListComponent},
  {path:"login", component:LoginComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
