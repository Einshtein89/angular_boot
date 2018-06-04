import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.css']
})
export class AddEntityComponent implements OnInit{
  private myForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;
  private email: FormControl;
  private phone: FormControl;
  private sex: FormControl;
  private statusCode: number;
  userList: User[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userList = this.userService.entityList;
    console.log(this.userList);
    this.createFormControls();
    this.createForm();
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
          this.userService.entityList.push(user);
          this.myForm.reset();
          this.router.navigate(['/main']);
        },
        errorCode => this.statusCode = errorCode
      );
    return false;
  }
}
