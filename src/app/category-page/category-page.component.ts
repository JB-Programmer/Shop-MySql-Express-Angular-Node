import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DataService } from './../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  productsByCat: any;
  categoryps;
  constructor( private getdata: DataService, private theRoute: ActivatedRoute ) {

  }

  ngOnInit() {
    this.theRoute.queryParams.subscribe(params => {
      this.categoryps = params['catname'];
      this.getProdByCatName(this.categoryps);
    });

  }


  getProdByCatName(category) {
    this.getdata.getProductsByCatName(category)
    .subscribe(
      res => {
        this.productsByCat = res.json();
      });
  }

  addProduct(product) {
    alert(product.id);

  }


}
