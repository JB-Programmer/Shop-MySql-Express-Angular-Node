import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  products: any;
  productsByCat: any;

  category = 'Suede';
  constructor(private getdata: DataService) { }

  ngOnInit() {
    this.getProducts();
    this.getProdByCatName('Suede');
  }

  getProducts() {
    this.getdata.getAllProducts()
    .subscribe(
      res => {
        this.products = res.json();
      });
  }

  getProdByCatName(category) {
    this.getdata.getProductsByCatName(category)
    .subscribe(
      res => {
        this.productsByCat = res.json();
      });
  }

}
