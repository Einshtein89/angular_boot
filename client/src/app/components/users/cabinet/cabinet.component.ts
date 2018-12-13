import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {TokenStorage} from "../../../services/auth/token.storage";
import {User} from "../../../models/user.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormCreateService} from "../../../services/form.create.service";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";
import {FileHolder} from "angular2-image-upload";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ImageService} from "../../../services/user/image.service";
import {Router} from "@angular/router";

declare var $ : any;

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit, AfterViewChecked {

  private user: User;
  private loading: boolean;
  private statusCode: string;
  private errorList: any;

  private myForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;
  private email: FormControl;
  private phone: FormControl;
  private sex: FormControl;
  private photo: FormData = null;
  private url: any;

  private sexArray: Array<string>;
  private editableFields: Map<string, boolean> = new Map<string, boolean>();
  private formFields: Map<any, any>;
  private imgSrc: string;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorage,
              private formCreateService: FormCreateService,
              private location: Location,
              private translate: TranslateService,
              private cdr: ChangeDetectorRef,
              private imageService: ImageService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.loading = true;
    this.userService.getUserByUserName(this.tokenStorage.getUserId())
      .subscribe(
        data => {
          this.user = this.extractUsers(data);
          this.populateTextMessages();
          this.createForm();
          this.imgSrc = this.imageService.getImgSrc(this.user);
        },
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
  }

  private onSubmit(user: User) {
    if (!this.myForm.valid) {
      return false;
    }
    this.updateUser(user)
  }

  private goToPrevPage() {
    this.myForm.reset();
    this.location.back();
  }

  private updateUser(user: User) {
    this.userService.updateUser(user, this.user["_links"].self.href)
      .subscribe(
        () => {
          this._renderMessage(this.translate.instant('user.form.actions.user.created.1')
            + user.firstName
            + this.translate.instant('user.form.actions.user.updated.2')
          );
          if ((!this.photo || $('.img-ul-container').children().length == 0) && !this.user.photo) {
            return;
          }
          this.imageService.postImage(this.photo ?
            this.photo :
            this.imageService.convertByteArraytoFormData(this.user.photo.body, "image/jpg"))
            .subscribe(
              (res) => {
                this.imgSrc = this.imageService.getImgSrc(res);
                // this.photo = res.photo.body;
                this.errorList = [];
                // $('#imageUploader').css('display', 'none');
                // $('.img-ul-container').empty();
                setTimeout(function() {
                  window.location.reload();
                }.bind(this), 2000);
              },
              (error) => this.errorList = error.error
            );
        },
        error => this.errorList = error.error
      );
    return false;
  }
  private _renderMessage(message) {
    $.confirm({
      animation: 'top',
      closeAnimation: 'top',
      title: this.translate.instant('user.form.actions.confirm.popup.title'),
      content: message,
      draggable: false,
      closeIcon: true,
      buttons: {
        ok: function () {
        },
      }
    });
  }

  private extractUsers(data: any) {
    return data;
  }

  private createForm() {
    this.myForm = new FormGroup({});
    this.formFields = this.populateFieldsAndValidators();
    this.formFields.forEach((validators: any, fieldParameters: any) => {
      this[fieldParameters['name']] = this.formCreateService
        ._createFormControl(this.user, fieldParameters, validators);
      this.myForm.setControl(fieldParameters['name'], this[fieldParameters['name']]);
      this.editableFields.set(fieldParameters['name'], false);
    });
    this.myForm.setValidators(null);
  }

  private populateFieldsAndValidators() {
    let fieldsWithValidators = new Map();
    fieldsWithValidators.set({name: "firstName", defaultValue: ''}, [
      Validators.required,
      Validators.maxLength(50)
    ]);
    fieldsWithValidators.set({name: "lastName", defaultValue: ''}, [
      Validators.required,
      Validators.maxLength(50)
    ]);
    fieldsWithValidators.set({name: "email", defaultValue: ''}, [
      Validators.required,
      Validators.email
    ]);
    fieldsWithValidators.set({name: "password", defaultValue: ''}, null);
    fieldsWithValidators.set({name: "phone", defaultValue: ''}, [
      Validators.required,
      Validators.pattern('^(\\+?(\\d{1}|\\d{2}|\\d{3})[- ]?)?\\d{3}[- ]?\\d{3}[- ]?\\d{4}$')
    ]);
    fieldsWithValidators.set({name: "sex", defaultValue: this.getDefaultSex()}, Validators.required);
    // fieldsWithValidators.set({name: "photo", defaultValue: ''}, null);
    return fieldsWithValidators;
  }

  private getDefaultSex(): string {
    return this.sexArray[0];
  }

  private getKey(sex: string) {
    return sex.substring(0, sex.indexOf(';'));
  }

  private getValue(sex: string) {
    return sex.substring(sex.indexOf(';') + 1, sex.length);
  }

  private getUneditableSexValue(sex: string) {
    if (sex == "man") {
      return this.getValue(this.translate.instant('user.form.actions.sex.man'));
    } else {
      return this.getValue(this.translate.instant('user.form.actions.sex.woman'));
    }
  }


  private populateTextMessages() {
    this.sexArray = [this.translate.instant('user.form.actions.sex.man'),
      this.translate.instant('user.form.actions.sex.woman')];
  }

  private setFieldUneditable(name: string, errors: any) {
    if (!errors) {
      this.editableFields.set(name, false)
    }
  }

  private onUploadFinished(event: FileHolder) {
    this.photo = this.imageService.prepareMultipartRequest(event);
    // this.showImageUploader();
  }

  private getUserPhoto() {
    return this.imgSrc;
  }

  private showImageUploader() {
    $('#imageUploader').css('display', 'inline');
  }

  private hideImageUploader() {
    if ($('.img-ul-image').length > 0) {
      $('.img-ul-image').css('display', 'block');
    } else {
      $('#imageUploader').css('display', 'none');
    }
  }

  private getTranslationForChangePhotoButton() {
    return this.translate.instant('user.form.actions.photo.change.button.label');
  }

  private getTranslationForUpdatePhotoButton() {
    return this.translate.instant('user.form.actions.photo.upload.button.label');
  }

  ngAfterViewChecked(): void {
    // if ($('.img-ul-image').css('display') == 'block') {
    //   $('.img-ul-file-upload').css('display', 'none');
    // } else {
    //   $('.img-ul-file-upload').css('display', 'block');
    // }
    this.populateTextMessages();
    this.cdr.detectChanges();
  }

  onRemoved() {
    // this.photo = null;
    // $('.img-ul-container').html = '';
  }
}
