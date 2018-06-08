import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.css']
})
export class AddEntityComponent implements OnInit, OnDestroy {
  private myForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;
  private email: FormControl;
  private phone: FormControl;
  private sex: FormControl;
  private statusCode: number;
  userList: User[];
  errorList: any;
  _ref:any;
  isCreated: boolean;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isCreated = true;
    this.initializeUserList();
    console.log(this.userList);
    this.createFormControls();
    this.createForm();
  }

  ngOnDestroy() {}

  removeObject(){
    this._ref.destroy();
    this.ngOnDestroy();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]);
    this.sex = new FormControl('', Validators.required);
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
    console.log(user);
    this.userService.createUser(user)
      .subscribe(
        () => {
          this.myForm.reset();
          this.removeObject();
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
}
