import {USERS_API_URL} from "../services/user.service";

export var constants: Array<any> = [
  {provide: USERS_API_URL, useValue: 'http://localhost:3000/users'}
];
