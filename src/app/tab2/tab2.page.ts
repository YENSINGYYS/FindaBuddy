import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  id: string;
  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router) {}

  ngOnInit(){

    this.id = this.route.snapshot.params.email

  }
}
