import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { EmploymentsAddPage } from './employments-add';
import { SelfEmployedAddPage } from './self-employed-add';
import { RetiredAddPage } from './retired-add';
import { EmploymentsEditPage } from './employments-edit';



/*
  Generated class for the Income page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-income',
  templateUrl: 'income.html'
})
export class IncomePage {
  employmentObject = {};
  user = {};
  loggedUser:string = '';
  public incomeemployment: any[] = [];
  public incomeselfemployed: any[] = [];
  public incomeretired: any[] = [];

  constructor(public modalCtrl: ModalController, navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController,  public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
      });
      loader.present();
     // End of loader

     backand.user.getUserDetails(false)
    .then(res => {
      this.user = res.data
      this.loggedUser = res.data.userId
      this.backand.object.getOne("users", this.loggedUser, {
        "deep" : true })
        .then(res => {
          this.incomeemployment = res.data.incomeemployment
          this.incomeselfemployed = res.data.incomeselfemployed
          this.incomeretired = res.data.incomeretired
          console.log(this.incomeemployment, "<==== Users incomeemployment");
          console.log(this.incomeselfemployed, "<==== Users incomeselfemployed");
          console.log(this.incomeretired, "<==== Users incomeretired");
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
    console.log('ionViewDidLoad IncomePage');
  }

  addEmployment() {
      let modal = this.modalCtrl.create(EmploymentsAddPage);
      modal.present();
  }

  addSelfEmployed() {
      let modal = this.modalCtrl.create(SelfEmployedAddPage);
      modal.present();
  }
  addRetired() {
      let modal = this.modalCtrl.create(RetiredAddPage);
      modal.present();
  }


  // employments Edit or Delete
  editEmployment(id) {
  console.log(id, "employment Button Clicked")
  let actionSheet = this.actionSheetCtrl.create({
    title: '',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          console.log('Delete');
          this.backand.object.remove("incomeEmployment", id, {
            "deep" : false })
            .then(res => {
              alert('Successfully Deleted!');
              // console.log(res, "<==== OBJECT REMOVED *******************");
          })
          .catch(err => {
            console.log(err);
          }); // End of emergency object delete
        }
      },{
        text: 'Edit',
        handler: () => {
          console.log('Edit Clicked');
          this.employmentsModal(id)
        //   console.log(id, "<======= THIS IS ID")
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
  }

  employmentsModal(id) {
    this.backand.object.getOne("incomeEmployment", id, {
      "deep" : false })
      .then(res => {
        this.employmentObject = res.data
        console.log(res.data, "res data")
        let modal = this.modalCtrl.create(EmploymentsEditPage, this.employmentObject); // <== HAVE TO PASS OBJECT & NOT AN ID!
        modal.present();
    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch

  }



}
