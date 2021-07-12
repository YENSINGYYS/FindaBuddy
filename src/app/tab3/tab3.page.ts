import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any = [];
  submitted: boolean = false;
  send: boolean = true;
  searchBuddy: FormGroup;

  id: string;
  userEmail: string; 

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router) {

    this.searchBuddy = new FormGroup({
      age: new FormControl(),
      gender: new FormControl(''),
      location: new FormControl(''),
      //location: new FormControl(''),
      //fitnesslevel: new FormControl(''),

    })
    
  }

  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('Got item: ', value);
    this.id = value;
    console.log(this.id)
  }

  ngOnInit(){
    this.loginUser()

  }

  search(){
    this.submitted =true;
    var url = 'https://itj-findabuddy.herokuapp.com/getUser';
    console.log(document.getElementById('currentUser').textContent)

    var postData = JSON.stringify({
      currentUser: document.getElementById("currentUser").textContent,

      location: this.searchBuddy.value['location']
      //front end value
    });

 
    console.log(postData)
 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };

    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postData:', postData)
      console.log('data', data);
      this.user = data
      
      }, error => {
          console.log(error);
      });


  }

  

  sendRequest(){
    this.submitted =true;
    var url = 'https://itj-findabuddy.herokuapp.com/sendRequest';

    var postData = JSON.stringify({
     currentUser: document.getElementById("currentUser").textContent,
     receiverId: document.getElementById('label1').textContent

     //front end value
    });

 
    console.log(postData)
 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };

    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postData:', postData)
      console.log('data', data);
      
      }, error => {
          console.log(error);
      });


      this.router.navigate(['tabs/tab3']); //Navigate to tab3
    }


  }




