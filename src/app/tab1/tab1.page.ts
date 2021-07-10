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

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private modalController:ModalController) {

    
  }
  async login(){
    const modal = await this.modalController.create({
      component:LoginPage
    });
    return await modal.present();
  }
  async getItem() {
    const { value } = await Storage.get({ key: 'email' });
    console.log('Got item: ', value);
    this.userEmail = value;
  }


  ngOnInit(){
    this.getItem()

  }
  

}

