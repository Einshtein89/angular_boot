import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
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
  private phone: FormControl;
  private sex: FormControl;
  userList: User[];
  errorList: any;
  _ref:any;
  _currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initializeUserList();
    this.createFormControls();
    this.createForm();
    $("#addEditUserModal").modal(/*{backdrop: "static"}*/);
  }

  ngOnDestroy() {
  }

  removeObject(){
    $("#addEditUserModal").modal('hide');
    this._ref.destroy();
    this.ngOnDestroy();
  }

  createFormControls() {
    this.firstName = new FormControl(this._currentUser ? this._currentUser.firstName : '', Validators.required);
    this.lastName = new FormControl(this._currentUser ? this._currentUser.lastName : '', Validators.required);
    this.email = new FormControl(this._currentUser ? this._currentUser.email : '', [
      Validators.required,
      Validators.email
    ]);
    this.phone = new FormControl(this._currentUser ? this._currentUser.phone : '', [
      Validators.required,
      // Validators.minLength(8)
    ]);
    this.sex = new FormControl(this._currentUser ? this._currentUser.sex : '', Validators.required);
  }

  createForm() {
    this.myForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      sex: this.sex
    });
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
          this.removeObject();
          this._renderMessage("User " + user.firstName + " was updated!");
        },
        error => this.errorList = error.error
      );
    return false;
  }

  private createUser(user: User) {
    this.userService.createUser(user)
      .subscribe(
        () => {
          this.myForm.reset();
          this.removeObject();
          this._renderMessage("User " + user.firstName + " was created!");
        },
        error => this.errorList = error.error
      );
    return false;
  }

  private initializeUserList() {
    if (this.userService.entityList) {
      this.userList = this.userService.entityList;
    } else {
      this.userService.getAllUsers().subscribe(
        data => this.userList = data["_embedded"].users
      )
    }
  }

  private _renderMessage(message) {
    $.confirm({
      title: '',
      content: message,
      draggable: false,
      closeIcon: true,
      type: 'red',
      buttons: {
        ok: function () {
        },
      }
    });
    // if (addErrorDiv) {
    //   $('#messages').html("");
    //   $('<div id="messages"></div>').insertBefore($('#registerform'));
    //   $("#messages").html(message);
    // }
  };

}
