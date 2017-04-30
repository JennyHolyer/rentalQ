import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the Occupants page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-occupants',
  templateUrl: 'occupants.html'
})
export class OccupantsPage {

  name:string = '';
  registrationNumber:string = '';
  type: string = '';
  user = {};
  public coapplicants: any[] = [];
  public dependents: any[] = [];
  public pets: any[] = [];
  loggedUser:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
      });
      loader.present();
     // End of loader

    let applicationinformation = [],
        coapplicants           = [],
        dependents             = [],
        documents              = [],
        emergency              = [],
        incomeemployment       = [],
        incomeretired          = [],
        incomeselfemployed     = [],
        messages               = [],
        pets                   = [],
        rentalhistory          = [],
        utilities              = [];

      backand.user.getUserDetails(false)
     .then(res => {
       this.user = res.data
       this.loggedUser = res.data.userId
       this.backand.object.getOne("users", this.loggedUser, {
         "deep" : true })
         .then(res => {
           this.coapplicants = res.data.coapplicants
           this.dependents = res.data.dependents
           this.pets = res.data.pets
           console.log(this.pets, "<==== Users CoApplicants");
           console.log(this.pets, "<==== Users Dependents");
           console.log(this.pets, "<==== Users Pets");
           console.log(res.data);
       })
       .catch(err => {
         console.log(err);
       }); // End of user object fetch

     })
     .catch(err => {
       console.log(err);
     }); // End of user object fetch



  } // END OF CONSTRUCTOR

  ionViewDidLoad() {
    console.log('ionViewDidLoad OccupantsPage');
  }

  public editPet(id) {
    this.backand.object.getOne("pets", id, {
    "deep" : false })
    .then(res => {
      // id:15
      // name:"Riki"
      // type:"Pigeon"
      // user:"10"
    })
    .catch(err => {

    })
  }

  public addPet() {
  let baseURL = 'https://api.backand.com/1/objects/';
  let objectName = 'pets/';
  let apiURL = baseURL + objectName;
  console.log(apiURL, "<==== BASE URL");
  // let API = this.backand.getApiUrl();

  let alert = this.alertController.create({
    title: 'Add Pet',
    inputs: [
      {
        name: 'name',
        placeholder: 'Pet Full Name'
      },
      {
        name: 'type',
        placeholder: 'Type (e.g.Dog, Cat)',
      },
      {
        name: 'registrationNumber',
        placeholder: 'Pet Registration No.',
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel Clicked');
        }
      },
      {
        text: 'Save',
        role: 'put',
        handler: data => {
          console.log('Save Clicked');
          this.backand.object.create('pets', {
            'name': data.name, 'registrationNumber': data.registrationNumber, 'type': data.type, 'user': 1
          })
          .then(data => {
            console.log(data, '<===== data from backend PROMISE')
          })
          .catch(error => { })
          // this.http.get('https://api.backand.com/1/objects/items/1').map(res => res.json().data);
          console.log(data, '<===== data from backend save handler')
        }
      }
    ]
  });
  alert.present();
  }

}
