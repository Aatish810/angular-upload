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
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(5));
  public demoForm: FormGroup;
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
        for(let file of this.demoForm.get('files').value) {
          if(file.name) {
            let fileExtn = this.getFileExtension(file.name)
            if(fileExtn!='png' && fileExtn != 'jpg' && fileExtn != 'pdf' ) {
              this.removeInValidFile(file);
              alert('not a valid file');
              return;
            }
          }
         let fileSize = file.size/1024/1024;
         if(fileSize > 5) {
           this.removeInValidFile(file);
           alert('only 5 MB is allowed');
           return;
         } 
        }
        if(this.demoForm.get('files').value.length >= 5) {
          this.demoForm.disable();
        }
      });
    }

    removeInValidFile(file) {
      lodash.remove(this.demoForm.get('files').value, (f) => {
        return f.name === file.name;
      });
    }

    getFileExtension(name) {
      return name.split('.')[1];
    }

    uploadFilesToDb() {
      this.filesControl.setValue([]);
      console.log(this.demoForm.value.files)
    }
 
}
