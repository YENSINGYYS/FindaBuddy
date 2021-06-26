import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
 // age: Int16Array;
  //gender: string;
  //location: string;
  //USERCREATED: string;
  //fitnesslevel: string;
  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router) {
    
    this.searchBuddy = new FormGroup({
      age: new FormControl(),
      gender: new FormControl(''),
      //location: new FormControl(''),
      //fitnesslevel: new FormControl(''),

    })


  //  this.USERCREATED = this.route.snapshot.params.id;
    
  }

  ngOnInit(){
   // this.getUser();
   if (this.submitted == false){

   }
  }

/*   async getUser(){
    var url = 'https://itj-findabuddy.herokuapp.com/getUser';
    this.http.get(url).subscribe(data => {
      this.user = data
    });
  } */
  

  search(){
    this.submitted =true;
    var url = 'https://itj-findabuddy.herokuapp.com/getUser';

    var postData = JSON.stringify({
    //  username: this.searchBuddy.value['age'],
      gender: this.searchBuddy.value['gender']
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

/*     this.http.get(url).subscribe((data) => {
      console.log('postData:', postData)
      console.log('DATA:', data);
      if (data == false) {
        // this.failed()
        console.log("failed")
      }
      else if (data == true) {
        // this.successful()
        console.log("succeed")
        window.location.reload();
      }
    }, error => {
      console.log(error);
    });
 */
  //  this.router.navigate(['tabs/tab2']); //once added relocate to tab2
    
  }




