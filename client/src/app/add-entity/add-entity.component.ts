import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Entity} from "../model/entity";

@Component({
  selector: 'add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.css']
})
export class AddEntityComponent {
  @Input() entityList: Entity[];
  myForm: FormGroup;


  constructor(fb: FormBuilder) {
    this.entityList = [
      new Entity("First", "Contents of the First element"),
      new Entity("Second", "Contents of the Second element"),
    ];
    this.myForm = fb.group({
      'title': [''],
      'content' : ['']
    })
  }

  onSubmit(value: any): boolean {
    this.entityList.push(new Entity(value.title, value.content));
    this.myForm.reset();
    return false;
  }

  isValidToSubmit(): boolean {
    return this.myForm.get('title').value !== "" && this.myForm.get('content').touched
  }

}
