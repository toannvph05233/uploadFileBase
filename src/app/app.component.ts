import {Component, ElementRef, ViewChild} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoUploadFile';

  @ViewChild('uploadFile1', {static: true}) public avatarDom1: ElementRef | undefined;

  arrfiles: any = [];
  arrayPicture : string[] = [];

  constructor(private storage: AngularFireStorage) {
  }

  submit() {
    for (let file of this.arrfiles) {
      if (file != null) {
        const filePath = file.name;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, file).snapshotChanges().pipe(
          finalize(() => (fileRef.getDownloadURL().subscribe(
            url => {
              this.arrayPicture.push(url);
              console.log(url);
            })))
        ).subscribe();
      }
    }
  }

  uploadFileImg() {
    for (const argument of this.avatarDom1?.nativeElement.files) {
      this.arrfiles.push(argument)
    }
    this.submit();
  }
}
