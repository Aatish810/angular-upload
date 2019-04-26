import { Component, OnInit, OnChanges } from '@angular/core';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as lodash from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ignite-test';
  private filesControl = new FormControl(null);
  public demoForm: FormGroup;
  public invalidFileSizeDetail = [];
  public invalidFileFormatDetail = [];
  public copyArray = [];
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.demoForm = this.formBuilder.group({
      files: this.filesControl
    });
    this.onChanges()
  }

  onChanges() {
    this.demoForm.get('files').valueChanges.subscribe(() => {
      let count = 0;
      for (let file of this.demoForm.get('files').value) {
        if (file.name) {

          let fileExtn = this.getFileExtension(file.name);
          // checking file format
          if (fileExtn === 'png' || fileExtn === 'jpg' || fileExtn === 'pdf') { 
            let fileSize = file.size / 1024 / 1024;
            if (fileSize > 5) {
              if (!lodash.includes(this.invalidFileSizeDetail, file.name)) {
                this.invalidFileSizeDetail.push(file.name);
                alert('only 5 MB is allowed');
              }
              this.removeInValidFile(file);
            }
          } else {
            if (!lodash.includes(this.invalidFileFormatDetail, file.name)) {
              this.invalidFileFormatDetail.push(file.name);
              alert('not a valid file');
            }
            this.removeInValidFile(file);
          }
        }
        if (this.demoForm.get('files').value.length >= 5) {
          this.demoForm.disable();
        }
      }

    });
  }

  removeInValidFile(file) {
   // this.filesControl.setValue([]);
   // console.log(this.filesControl.get('files'))
    if (this.demoForm.value.files === null) {
      this.filesControl.setValue([]);
    } else {
      lodash.remove(this.demoForm.get('files').value, (f) => {
        return f.name === file.name;
      });
     }
  }

  getFileExtension(name) {
    return name.split('.')[1];
  }

  uploadFilesToDb() {
    console.log(this.demoForm.value.files);
    this.filesControl.setValue([]);
  }

}
