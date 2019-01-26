import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  allCategoryNames: any;
  thelink;
  constructor(private getdata: DataService, private theRoute: ActivatedRoute) { }


  ngOnInit() {
    this.getCategorynames();
    // console.log(this.allCategoryNames);
  }


  getCategorynames() {
    this.getdata.getCategoriesNames()
    .subscribe(
      res => {
        this.allCategoryNames = res.json();
        console.log(this.allCategoryNames[0].id);

      });
  }

}
