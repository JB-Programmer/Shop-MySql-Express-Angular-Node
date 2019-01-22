import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


/* import { AuthGuard } from './services/auth-guard.service'; */
/* import { UserService } from './services/user.service'; */
/* import { CartService } from './services/cart.service'; */
/* import { DateFormatPipe } from './dateFormat.pipe'; */


import { AppComponent } from './app.component';


//Services
import { DataService } from '../services/data.service';

//Components
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
//import {LoginComponent} from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryPageComponent,
    ProductPageComponent,
    NotFoundComponent,
    //LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'category',
        component: CategoryPageComponent
      },
      {
        path: 'product/:id',
        component: ProductPageComponent
      },
      {
        path: '*',
        component: AppComponent
      },
    ]),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
