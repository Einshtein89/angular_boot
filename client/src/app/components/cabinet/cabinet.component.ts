import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {TokenStorage} from "../../services/auth/token.storage";
import {User} from "../../models/user.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormCreateService} from "../../services/form-create.service";

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  private user: User;
  private loading: boolean;
  private statusCode: string;

  private myForm: FormGroup;
  private firstName: FormControl = new FormControl();
  private lastName: FormControl = new FormControl();
  private email: FormControl = new FormControl();
  private phone: FormControl = new FormControl();
  private sex: FormControl = new FormControl();

  private readonly sexArray: any;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorage,
              private formCreateService: FormCreateService) {
    this.sexArray = ['man', 'woman'];
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
          this.createForm();
        },
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
  }

  private extractUsers(data: any) {
    return data;
  }

  private createForm() {
    this.myForm = new FormGroup({});
    this.populateFieldsAndValidators().forEach((validators: any, fieldParameters: any) => {
      this[fieldParameters['name']] = this.formCreateService
        ._createFormControl(this.user, fieldParameters, validators);
      this.myForm.setControl(fieldParameters['name'], this[fieldParameters['name']]);
    });
    this.myForm.setValidators(null);
  }

  private populateFieldsAndValidators() {
    let fieldsWithValidators = new Map();
    fieldsWithValidators.set({name: "firstName", defaultValue: ''}, Validators.required);
    fieldsWithValidators.set({name: "lastName", defaultValue: ''}, Validators.required);
    fieldsWithValidators.set({name: "email", defaultValue: ''}, [
      Validators.required,
      Validators.email
    ]);
    // fieldsWithValidators.set({name: "password", defaultValue: ''}, Validators.required);
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
}
