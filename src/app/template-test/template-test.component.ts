import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as lodash from 'lodash';

@Component({
  selector: 'app-template-test',
  templateUrl: './template-test.component.html',
  styleUrls: ['./template-test.component.css']
})
export class TemplateTestComponent implements OnInit {

  public uploadedFiles: Array<File> = [];
  @ViewChild('demoForm') ngForm: NgForm;
  private formChangesSubscription;
  private invalidFileSizeDetail = [];
  private invalidFileFormatDetail = [];

  constructor() { }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(currentFiles => {
     // console.log(files)
      for(let file of currentFiles.files) {
        let fileExtn = this.getFileExtension(file.name);
        if(fileExtn === 'pdf' || fileExtn === 'jpg' || fileExtn === 'png') {
          let fileSize = file.size / 1024 / 1024;
          if (fileSize > 5) {
            if (!lodash.includes(this.invalidFileSizeDetail, file.name)) {
              this.invalidFileSizeDetail.push(file.name);
              alert('only 5 MB is allowed');
            }
            this.removeInValidFile(file, currentFiles.files);
          }
        } else {
          if (!lodash.includes(this.invalidFileFormatDetail, file.name)) {
            this.invalidFileFormatDetail.push(file.name);
            alert('not a valid file');
          }
          this.removeInValidFile(file, currentFiles.files);
        }
      }
    });
  }
  
  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

  getFileExtension(name) {
    return name.split('.')[1];
  }

  removeInValidFile(file, files) {
       lodash.remove(files, (f) => {
         return f.name === file.name;
       }); 
   }

   uploadFilesNow() {
     console.log(this.uploadedFiles);
   }

}
