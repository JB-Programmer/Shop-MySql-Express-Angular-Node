import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DataService } from './../../services/data.service';
import { ActivatedRoute, ROUTER_CONFIGURATION } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  theproductname: string;
  // TODO EASY TO BRING AL THE CATEGORIES AND PUT IT LIKE AN INPUT SELECTOR
  thecategory: string;
  thedescription: string;
  theprice: number;
  constructor( private dataService: DataService, private myRoute: ActivatedRoute ) { }

  ngOnInit() {
  }

  onAddProduct() {
    if(true){
      console.log(this.thecategory);
      console.log(this.thecategory);
      console.log(this.thedescription);
      console.log(this.theprice);
      return;
    }else{
      //console.log(form.value);
      // tslint:disable-next-line:max-line-length
      // this.authService.createUser(form.value.thename, form.value.thesurname, form.value.theusername, form.value.thepassword, form.value.theemail, form.value.thezehut, form.value.thestreet, form.value.thecity);
    }

  }
}
