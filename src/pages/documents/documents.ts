import { Component } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular'
import { NavController, NavParams, Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { IonicNativePlugin } from '@ionic-native/core';
import { Storage } from '@ionic/storage';

declare var cordova: any;

/*
  Generated class for the Documents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html'
})
export class DocumentsPage {

  loading: Loading;
  lastImage: string = null;
  user = {};
  primaryID: string = '';
  loggedUser:string = '';
  public base64Image: string;
  savePicID:string = '';
  path:string = '';

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, public platform: Platform, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private camera : Camera, private file: File, private filePath: FilePath, private transfer: Transfer, storage: Storage) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 600
      });
      loader.present();
     // End of loader

    backand.user.getUserDetails(false)
   .then(res => {
     this.user = res.data
     this.loggedUser = res.data.userId
     console.log(res.data, "<==== 6. DOCUMENTS GET USER DETAILS");
   })
   .catch(err => {
     console.log(err);
   }); // End of user object fetch

  //  const fileTransfer: TransferObject = this.transfer.create();


  storage.ready().then(() => {

    // set a key/value
    storage.set('name', 'Max');

    // Or to get a key/value pair
    storage.get('age').then((val) => {
      console.log('Your age is', val);
    })
  });


 } // END OF CONSTRUCTOR

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
  }


  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            console.log("Library Source Selected")
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            console.log("Camera Source Selected")
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();

}

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  let options = {
    quality: 100,
    destinationType: this.camera.DestinationType.NATIVE_URI,
    sourceType: sourceType,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    correctOrientation: true
  };


  // Get the data of an image <========
  this.camera.getPicture(options).then((imagePath) => {
    // console.log(options, "get picture method entered")
    // Special handling for Android library <========


    this.base64Image = "data:image/jpeg;base64," + imagePath;
    // this.base64Image = imagePath;
    this.path = imagePath + ".jpg";

    let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());


    let options = {
      returnObject: true
    }

    let data = {
      'user': 10, 'primaryID': this.path
    }
    this.backand.object.create('documents', data, options)
    .then(res => {
      console.log(res.data, "created object")
     alert('Document Pic Submitted');
    //  this.dismiss();
    this.savePicID = res.data.id

    this.backand.object.getOne("documents", this.savePicID, {
      "deep" : true })
      .then(res => {
        // this.primaryID = "data:image/jpeg;base64," + res.data.primaryID;
        // this.primaryID = res.data.primaryID;
    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch


    })
    .catch(error => {
     console.log(error, '<===== data from backend save handler')
    })




    // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
    //   this.filePath.resolveNativePath(imagePath)
    //   .then(filePath => {
    //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
    //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    //   });
    // } else {
    //   let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    //   let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    // }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}


// Create a new name for the image
private createFileName() {
  let d = new Date(),
  n = d.getTime(),
  newFileName =  "rentalq" + n + ".jpg";
  console.log(newFileName, "<===NEW FILE NAME")
  return newFileName;
}


// createFile(path, file, replace)






// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  console.log("copy to local dataDirectory hit")
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    console.log(this.lastImage, "<===")
  }, error => {
    console.log('Error while storing file.');
    this.presentToast('Error while storing file.');
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  console.log("Upload image method hit")
  // Destination URL
  let url = "https://api.backand.com:443/1/objects/documents";

  // File for Upload
  let targetPath = this.pathForImage(this.lastImage);

  // File name only
  let filename = this.lastImage;

  let options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };

  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();

  // Use the FileTransfer to upload the image <========
  const fileTransfer: TransferObject = this.transfer.create();
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}



} // End of page
