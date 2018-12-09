import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import * as  _ from "underscore";
import {AddEditEntityComponent} from "../components/users/add-edit-entity/add-edit-entity.component";

@Injectable()
export class FormCreateService {
  public _createFormControl(currentUser: User, fieldParameters: object, validators: any) {
    return new FormControl(currentUser && currentUser[fieldParameters['name']]
      ? currentUser[fieldParameters['name']]
      : fieldParameters['defaultValue'] ? fieldParameters['defaultValue'] : '', validators);
  }
}
