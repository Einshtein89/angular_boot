import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.css']
})
export class AddEntityComponent {
  @Input() entityList: User[];
  myForm: FormGroup;
  private statusCode: number;


  constructor(fb: FormBuilder, private userService: UserService) {
    this.myForm = fb.group({
      'title': [''],
      'content' : ['']
    })
  }

  onSubmit(value: any): boolean {
    let user = new User();
    user.firstName = "dfs";
    user.lastName = "sdfs";
    user.email = "q2@sdf.ru"
    this.entityList.push(user);
    this.myForm.reset();

    console.log(user);
    this.userService.createUser(user)
      .subscribe(
        successCode => this.statusCode = successCode,
        errorCode => this.statusCode = errorCode
      );
    return false;
  }

  isValidToSubmit(): boolean {
    return this.myForm.get('title').value !== "" && this.myForm.get('content').touched
  }

}
