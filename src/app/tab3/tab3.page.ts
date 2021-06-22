import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any = [];

  constructor(public http: HttpClient, private router: Router) {}

  ngOnInit(){
    this.getUser();
  }

  async getUser(){
    var url = 'https://itj-findabuddy.herokuapp.com/getUser';
    this.http.get(url).subscribe(data => {
      this.user = data
    });
  }

}
