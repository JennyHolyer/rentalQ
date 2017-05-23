import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
  Generated class for the Emergency page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-employments-add',
  templateUrl: 'employments-add.html'
})
export class EmploymentsAddPage {

  user = {};
  loggedUser:string = '';
  companyName:string = '';
  position:string = '';
  employmentType:string = '';
  salary:number = null;
  managerFullName:string = '';
  phoneNumber:string = '';
  startDate:string = '';
  endDate:string = '';
  public employmentsForm:any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

      this.employmentsForm = this.formBuilder.group({
          "companyName": ['', Validators.required],
          "position": ['', Validators.required],
          "employmentType": ['', Validators.required],
          "salary": [ , Validators.required],
          "managerFullName": ['', Validators.required],
          "phoneNumber": ['', Validators.required],
          "startDate": ['', Validators.required]
        //   "endDate": ['', Validators.required]

      });


    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
      });
      loader.present();
     // End of loader

     backand.user.getUserDetails(false)
    .then(res => {
      this.loggedUser = res.data.userId

      this.backand.object.getOne("users", this.loggedUser, {
        "deep" : true })
        .then(res => {
          this.user = res.data
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
    console.log('ionViewDidLoad Employment Add Page');
  }

// save method
  save() {
    console.log(this.loggedUser, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("Save Method Entered in Employment")
    this.backand.object.create('incomeEmployment', {
     'companyName': this.employmentsForm.value.companyName, 'position':this.employmentsForm.value.position,
     'employmentType': this.employmentsForm.value.employmentType, 'salary': this.employmentsForm.value.salary,'managerFullName': this.employmentsForm.value.managerFullName, 'phoneNumber': this.employmentsForm.value.phoneNumber, 'startDate': this.employmentsForm.value.startDate, 'user': this.loggedUser
    })
    .then(data => {
     alert('Employment Successfully Added');
     this.companyName = this.position = this.employmentType = this.managerFullName = this.phoneNumber = this.startDate = this.loggedUser = '';

     this.dismiss();

    })
    .catch(error => {
     console.log(error, '<===== data from backend save handler')
    })
 }

 dismiss() {
  this.viewCtrl.dismiss();
}


}
