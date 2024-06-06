import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './view/product/product-list/product-list.component';

const routes: Routes = [
  {path:"", redirectTo:"dashboard", pathMatch:"full"},
  {path:"productos" ,component:ProductListComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
