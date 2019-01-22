import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DataService } from './../../services/data.service';



@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})

export class CategoryPageComponent implements OnInit {

  productsByCat: any;
  category:any;
  constructor(private getdata: DataService) { }

  ngOnInit() {
    this.getProdByCatName('Suede');
  }



  getProdByCatName(category) {
    this.getdata.getProductsByCatName(category)
    .subscribe(
      res => {
        this.productsByCat = res.json();
      });
  }



}
