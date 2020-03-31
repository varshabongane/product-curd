import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddEditProductComponent } from './components/products/add-edit-product/add-edit-product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';

const appRoutes = [
  {path:'add-category',component:AddCategoryComponent},
  {path:'category-list/:page',component:CategoryListComponent},
  {path:'category-list',component:CategoryListComponent},
  {path:'edit-category/:id',component:AddCategoryComponent},
  {path:'delete-category/:id',component:CategoryListComponent},

  {path:'add-product',component:AddEditProductComponent},
  {path:'product-list/:page',component:ProductListComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'edit-product/:id',component:AddEditProductComponent},
  {path:'delete-product/:id',component:ProductListComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddCategoryComponent,
    CategoryListComponent,
    AddEditProductComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
