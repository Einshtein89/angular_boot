import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {TokenStorage} from "../../services/auth/token.storage";
import {User} from "../../models/user.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormCreateService} from "../../services/form.create.service";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";

declare var $ : any;

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

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

  private sexArray: Array<string>;
  private editableFields: Map<string, boolean> = new Map<string, boolean>();
  private formFields: Map<any, any>;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorage,
              private formCreateService: FormCreateService,
              private location: Location,
              private translate: TranslateService) {
    // this.sexArray = ['man', 'woman'];
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
          console.log(this.myForm.get('firstName'))
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
          this.myForm.reset();
          this._renderMessage(this.translate.instant('user.form.actions.user.created.1')
            + user.firstName
            + this.translate.instant('user.form.actions.user.updated.2')
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

  setFieldUneditable(name: string, errors: any) {
    if (!errors) {
      this.editableFields.set(name, false)
    }
  }
}
