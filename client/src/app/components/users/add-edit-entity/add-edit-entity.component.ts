import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {PaginationService} from "../../../services/pagination.service";
import {EntityList} from "../entity-list/entity-list.component";
import {Location} from "@angular/common";
import {FormCreateService} from "../../../services/form.create.service";
import {TranslateService} from "@ngx-translate/core";

declare var $ : any;

@Component({
  selector: 'add-entity',
  templateUrl: './add-edit-entity.component.html',
  styleUrls: ['./add-edit-entity.component.css']
})
export class AddEditEntityComponent implements OnInit, OnDestroy, AfterViewChecked {
  public myForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;
  private email: FormControl;
  private password: FormControl;
  private phone: FormControl;
  private sex: FormControl;
  private confirmPassword: FormControl;
  userList: User[];
  private errorList: any;
  private _ref:any;
  private _currentUser: User;
  private _links: any;
  private _entityListComponent: EntityList;
  private _isRegister: boolean;
  private options: any;
  private isFirstNameRequired: boolean = true;
  private sexArray: Array<string>;
  private _isModal: boolean;
  private _isEdit: any;

  constructor(private userService: UserService,
              private paginationService: PaginationService,
              private location: Location,
              private formCreateService: FormCreateService,
              private translate: TranslateService,
              private cdr: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this._isRegister = this.options._isRegister || false;
    this._isModal = this.options._isModal || false;
    this._isEdit = this.options._isEdit || false;
    this.populateTextMessages();
    this.createForm();

    if (this._isModal) {
      $("#addEditUserModal").modal(/*{backdrop: "static"}*/);
    } else {
      $("#addEditUserModal").removeClass();
    }
  }

  ngOnDestroy() {
  }

  private createForm() {
    this.myForm = new FormGroup({});
    this.populateFieldsAndValidators().forEach((validators: any, fieldParameters: any) => {
      this[fieldParameters['name']] = this.formCreateService
        ._createFormControl(this._currentUser, fieldParameters, validators);
      this.myForm.setControl(fieldParameters['name'], this[fieldParameters['name']]);
    });
    this.myForm.setValidators(this.populateFormValidators());
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
    fieldsWithValidators.set({name: "password", defaultValue: ''}, Validators.required);
    fieldsWithValidators.set({name: "confirmPassword", defaultValue: ''}, null);
    fieldsWithValidators.set({name: "phone", defaultValue: ''}, [
      Validators.required,
      Validators.pattern('^(\\+?(\\d{1}|\\d{2}|\\d{3})[- ]?)?\\d{3}[- ]?\\d{3}[- ]?\\d{4}$')
    ]);
    fieldsWithValidators.set({name: "sex", defaultValue: this.getDefaultSex()}, Validators.required);
    return fieldsWithValidators;
  }

  private populateFormValidators() {
    return !this._isEdit ? this.MatchPassword : null;
  }

  //field can be required by condition
  private isFieldRequired()  {
    return this.isFirstNameRequired ? Validators.required : null;
  }

  private getDefaultSex(): string {
    return "";
  }

  private getKey(sex: string) {
    return sex.substring(0, sex.indexOf(';'));
  }

  private getValue(sex: string) {
    return sex.substring(sex.indexOf(';') + 1, sex.length);
  }

  private removeModal(){
    $("#addEditUserModal").modal('hide');
    this._ref.destroy();
    this.ngOnDestroy();
  }

  private goToPrevPage() {
    this.myForm.reset();
    this.location.back();
  }

  private onSubmit(user: User) {
    if (!this.myForm.valid) {
      return false;
    }
    if (this._currentUser) {
      this.updateUser(user)
    } else {
      this.createUser(user);
    }
  }

  private updateUser(user: User) {
    this.userService.updateUser(user, this._currentUser["_links"].self.href)
      .subscribe(
        () => {
          this.myForm.reset();
          this.removeModal();
          this._renderMessage(this.translate.instant('user.form.actions.user.created.1')
            + user.firstName
            + this.translate.instant('user.form.actions.user.updated.2')
          );
        },
        error => this.errorList = error.error
      );
    return false;
  }

  private createUser(user: User) {
    this.userService.createUser(user, this._isRegister)
      .subscribe(
        () => {
          this.myForm.reset();
          this._renderMessage(this.translate.instant('user.form.actions.user.created.1')
            + user.firstName
            + this.translate.instant('user.form.actions.user.created.2')
          );
          if (!this._isModal) {
            this.myForm.reset();
            this.location.back();
            return;
          }
          let usersOnLastPage = this._entityListComponent.page.totalElements % this._entityListComponent.page.size;
          if (this._entityListComponent.entityList.length / this._entityListComponent.page.size === 1
            && usersOnLastPage === 0)
          {
            this.paginationService.getPageByNumber(this._entityListComponent.page.totalPages)
              .subscribe(
                data => this._populateEntities(data)
              );
          } else {
            this.paginationService.getPageByLink(this._links.last.href)
              .subscribe(
                data => this._populateEntities(data)
              );
          }
          this.removeModal();
        },
        error => this.errorList = this.processErrors(error.error)
      );
    return false;
  }

  private _populateEntities(data: Object) {
    this._entityListComponent.entityList = this._entityListComponent.extractUsers(data);
    this._entityListComponent.links = this._entityListComponent.extractLinks(data);
    this._entityListComponent.page = this._entityListComponent.extractPage(data);
  }

  private populateTextMessages() {
    this.sexArray = [this.translate.instant('user.form.actions.sex.man'),
      this.translate.instant('user.form.actions.sex.woman')];
  }

  private processErrors(errors: Array<string>) {
    let result = [];
    errors.forEach((error) => result.push(this.translate.instant("backend.validation.errors." + error)));
    return result;
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

  private MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPassword').value;
    if(password != confirmPassword) {
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }

  ngAfterViewChecked(): void {
    this.populateTextMessages();
    this.cdr.detectChanges();
  }
}
