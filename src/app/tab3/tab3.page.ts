import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any = [];
  submitted: boolean = false;
  searchBuddy: FormGroup;
  age: Int16Array;
  gender: string;
  location: string;
  fitnesslevel: string;
  constructor(public http: HttpClient, private router: Router) {
    
    this.searchBuddy = new FormGroup({
      age: new FormControl(),
      gender: new FormControl(''),
      location: new FormControl(''),
      fitnesslevel: new FormControl(''),

    })
  }

  ngOnInit(){
   // this.getUser();
  }

/*   async getUser(){
    var url = 'https://itj-findabuddy.herokuapp.com/getUser';
    this.http.get(url).subscribe(data => {
      this.user = data
    });
  } */

 /*  async getUser(){
    var url = 'https://itj-findabuddy.herokuapp.com/getUser';
    var postData = JSON.stringify({
      Gender: this.searchBuddy.value['gender']

    })
    console.log(postData)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      if (data != null) {
        this.user = data;
      
      } else {
        // this.failed()
      }
    }, error => {
      console.log(error);
    });
  } */
  

  search(){
    this.submitted =true;
    var url = 'https://itj-findabuddy.herokuapp.com/getUser';

    var postData = JSON.stringify({
      //username: this.searchBuddy.value['username'],
      Gender: this.searchBuddy.value['gender']
    });

    console.log(postData)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };

    this.http.get(url).subscribe(data => {
      this.user = data
      console.log(data)
    });

   


    /* this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log(postData)
      console.log(data);
      if (data == true) {
        this.user = data;
        window.location.reload();
      } else {
        // this.failed()
      }
    }, error => {
      console.log(error);
    });
    this.router.navigate(['tabs/tab3']);
  }//if valid */

  }

}
