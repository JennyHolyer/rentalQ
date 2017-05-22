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
  selector: 'page-self-employed-add',
  templateUrl: 'self-employed-add.html'
})
export class SelfEmployedAddPage {

  user = {};
  loggedUser:string = '';
  businessName:string = 'Vivint';
  position:string = 'CEO';
  abnNumber:string = '01235984';
  acnNumber:string = '01235984';
  salary:number = 500000;
  startDate:string = '04/29/2007';
  public selfEmployedForm:any;



  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

      this.selfEmployedForm = this.formBuilder.group({
            "businessName": ['', Validators.required],
            "position": ['', Validators.required],
            "abnNumber": ['', Validators.required],
            "acnNumber": ['', Validators.required],
            "salary": [ , Validators.required],
            "startDate": ['', Validators.required]
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
    this.backand.object.create('incomeSelfEmployed', {
     'businessName': this.selfEmployedForm.value.businessName, 'position':this.selfEmployedForm.value.position,
     'abnNumber': this.selfEmployedForm.value.abnNumber, 'salary': this.selfEmployedForm.value.salary,'acnNumber': this.selfEmployedForm.value.acnNumber, 'startDate': this.selfEmployedForm.value.startDate, 'user': this.loggedUser
    })
    .then(data => {
     alert('Self-Employed Successfully Added');
     this.businessName = this.position = this.abnNumber = this.acnNumber  = this.startDate = this.loggedUser = '';

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
