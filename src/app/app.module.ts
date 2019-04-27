import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { TemplateTestComponent } from './template-test/template-test.component';
import { ReactiveTestComponent } from './reactive-test/reactive-test.component';
@NgModule({
  declarations: [
    AppComponent,
    TemplateTestComponent,
    ReactiveTestComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
