import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {PaginationService} from "../../services/pagination.service";
import {EntityList} from "../entity-list/entity-list.component";
import {ValidatorFn} from "@angular/forms/src/directives/validators";
import {Router, RouterStateSnapshot} from "@angular/router";
import {Location} from "@angular/common";

declare var $ : any;

@Component({
  selector: 'add-entity',
  templateUrl: './add-edit-entity.component.html',
  styleUrls: ['./add-edit-entity.component.css']
})
export class AddEditEntityComponent implements OnInit, OnDestroy {
  private myForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;
  private email: FormControl;
  private password: FormControl;
  private phone: FormControl;
  private sex: FormControl;
  private confirmPassword: FormControl;
  userList: User[];
  errorList: any;
  _ref:any;
  _currentUser: User;
  _links: any;
  _entityListComponent: EntityList;
  _isRegister: boolean;
  options: any;
  isFirstNameRequired: boolean = true;
  sexArray: any;
  _isModal: boolean;
  _isEdit: any;

  constructor(private userService: UserService,
              private paginationService: PaginationService,
              private _location: Location) {
    this.sexArray = ['man', 'woman'];
  }


  ngOnInit(): void {
    this._isRegister = this.options._isRegister || false;
    this._isModal = this.options._isModal || false;
    this._isEdit = this.options._isEdit || false;
    // this.initializeUserList();
    this.createFormControls();
    this.createForm();
    if (this._isModal) {
      $("#addEditUserModal").modal(/*{backdrop: "static"}*/);
    } else {
      $("#addEditUserModal").removeClass();
    }
  }

  ngOnDestroy() {
  }

  removeModal(){
    $("#addEditUserModal").modal('hide');
    this._ref.destroy();
    this.ngOnDestroy();
  }

  goToPrevPage() {
    this.myForm.reset();
    this._location.back();
  }

  createFormControls() {
    this.firstName = this._createFormControl(this._currentUser, "firstName", this.isFieldRequired());
    this.lastName = this._createFormControl(this._currentUser, "lastName", Validators.required);
    this.email = this._createFormControl(this._currentUser, "email", [
      Validators.required,
      Validators.email
    ]);
    this.password = this._createFormControl(this._currentUser, "password", Validators.required);
    this.confirmPassword = new FormControl();
    this.phone = this._createFormControl(this._currentUser, "phone", [
      Validators.required,
      Validators.pattern('^(\\+?(\\d{1}|\\d{2}|\\d{3})[- ]?)?\\d{3}[- ]?\\d{3}[- ]?\\d{4}$')
    ]);

    this.sex = this._createFormControl(this._currentUser, "sex", Validators.required);
  }

  private _createFormControl(currentUser: User, fieldName: string, validators: any) {
    return new FormControl(currentUser && currentUser[fieldName]
      ? currentUser[fieldName]
      : fieldName === "sex" ? this.getDefaultSex() : '', validators)
  }

  //field can be required by condition
  private isFieldRequired()  {
    return this.isFirstNameRequired ? Validators.required : null;
  }

  private getDefaultSex(): string {
    return this.sexArray[0];
  }

  createForm() {
    this.myForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phone: this.phone,
      sex: this.sex
    }, {validators: () => this.MatchPassword});
  }

  onSubmit(user: User) {
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
          this._renderMessage("User " + user.firstName + " was updated!");
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
          this._renderMessage("User " + user.firstName + " was created!");
          if (!this._isModal) {
            this.myForm.reset();
            this._location.back();
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
        error => this.errorList = error.error
      );
    return false;
  }

  private _populateEntities(data: Object) {
    this._entityListComponent.entityList = this._entityListComponent.extractUsers(data);
    this._entityListComponent.links = this._entityListComponent.extractLinks(data);
    this._entityListComponent.page = this._entityListComponent.extractPage(data);
  }

  // private initializeUserList() {
  //   if (this.userService.entityList) {
  //     this.userList = this.userService.entityList;
  //   } else {
  //     this.userService.getAllUsers().subscribe(
  //       data => this.userList = data["_embedded"].users
  //     )
  //   }
  // }

  private _renderMessage(message) {
    $.confirm({
      animation: 'top',
      closeAnimation: 'top',
      title: 'Confirm',
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
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if(password != confirmPassword) {
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }
}
