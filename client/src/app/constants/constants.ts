import {USERS_API_URL} from "../service/user.service";

export var constants: Array<any> = [
  {provide: USERS_API_URL, useValue: 'http://localhost:3000/users'}
];
