import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { async } from '@angular/core/testing';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  currentUser: string;
  userEmail: string;

  id: string;

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private modalController:ModalController) {

    
  }
  async login(){
    const modal = await this.modalController.create({
      component:LoginPage
    });
    return await modal.present();
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
  

}

