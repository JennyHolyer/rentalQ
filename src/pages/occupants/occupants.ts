import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CoApplicantsAddPage } from './coapplicants-add';
import { DependentsAddPage } from './dependents-add';
import { PetsAddPage } from './pets-add';
import { CoApplicantsEditPage } from './coapplicants-edit';
import { DependentsEditPage } from './dependents-edit';
import { PetsEditPage } from './pets-edit';



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
  coApplicantObject = {};
  dependentObject = {};
  petObject = {};


  constructor(public modalCtrl: ModalController, navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController,  public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController) {

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

    addCoApplicant() {
        let modal = this.modalCtrl.create(CoApplicantsAddPage);
        modal.present();
    }

    addDependent() {
        let modal = this.modalCtrl.create(DependentsAddPage);
        modal.present();
    }

    addPet() {
        let modal = this.modalCtrl.create(PetsAddPage);
        modal.present();
    }

    // coApplicant Edit or Delete
    editCoApplicant(id) {
    console.log(id, "CoApplicant Button Clicked")
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete');
            this.backand.object.remove("coApplicants", id, {
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
            this.coApplicantsModal(id)
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

    coApplicantsModal(id) {
      this.backand.object.getOne("coApplicants", id, {
        "deep" : false })
        .then(res => {
          this.coApplicantObject = res.data
          console.log(res.data, "res data")
          let modal = this.modalCtrl.create(CoApplicantsEditPage, this.coApplicantObject); // <== HAVE TO PASS OBJECT & NOT AN ID!
          modal.present();
      })
      .catch(err => {
        console.log(err);
      }); // End of user object fetch

    }


    // Dependents Edit or Delete
    editDependent(id) {
    console.log(id, "Dependent Button Clicked")
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete');
            this.backand.object.remove("Dependents", id, {
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
            this.dependentsModal(id)
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

    dependentsModal(id) {
      this.backand.object.getOne("Dependents", id, {
        "deep" : false })
        .then(res => {
          this.dependentObject = res.data
          console.log(res.data, "res data")
          let modal = this.modalCtrl.create(DependentsEditPage, this.dependentObject); // <== HAVE TO PASS OBJECT & NOT AN ID!
          modal.present();
      })
      .catch(err => {
        console.log(err);
      }); // End of user object fetch

    }


    // Pets Edit or Delete
    editPet(id) {
    console.log(id, "Dependent Button Clicked")
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete');
            this.backand.object.remove("Pets", id, {
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
            this.petsModal(id)
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

    petsModal(id) {
      this.backand.object.getOne("Pets", id, {
        "deep" : false })
        .then(res => {
          this.petObject = res.data
          console.log(res.data, "res data")
          let modal = this.modalCtrl.create(PetsEditPage, this.petObject); // <== HAVE TO PASS OBJECT & NOT AN ID!
          modal.present();
      })
      .catch(err => {
        console.log(err);
      }); // End of user object fetch

    }



}
