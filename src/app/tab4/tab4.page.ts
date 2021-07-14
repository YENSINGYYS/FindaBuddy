import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  NewsFeeds: any = [];
  arr: any = {};
  newfeedsId: string;
  id: string;
  constructor(private router:ActivatedRoute,public http: HttpClient) { 
    this.id = this.router.snapshot.params.id;
  }

  ngOnInit() {
    this.loginUser()
    this.getNewsfeeds()
  }
  //get userID after login 
   async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('Got item: ', value);
    this.id = value;
    console.log("userid:",this.id)
  }
  async getNewsfeeds(){
    var url = 'https://buddyfind.herokuapp.com/NewsFeeds';
    var getuserID = JSON.stringify({
      idNewsFeeds : this.newfeedsId,
      userID : this.id
      });
    console.log('Userid', getuserID)
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
      };
    this.http.get(url).subscribe((data) => {
    this.NewsFeeds=data
    console.log('Importdata', data)
    })

    }
    delete(item){
    var url = 'https://buddyfind.herokuapp.com/Deletenewsfeeds';
    var deletedata = JSON.stringify({
    idNewsFeeds : item.idNewsFeeds
    });
    
    const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
    })
    };
    this.http.post(url, deletedata, httpOptions).subscribe((data) => {
    console.log('deletedata:', deletedata)
    console.log(data);
    if (data == false) {
    // this.failed()
    } else if (data == true) {
    // this.successful()
    window.location.reload();
    }
    }, error => {
    console.log(error);
    });
    }
    
}
