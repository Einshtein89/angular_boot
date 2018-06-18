import {USERS_API_URL} from "../services/user.service";
import {DEFAULT_PAGE_SIZE} from "../services/pagination.service";

export var constants: Array<any> = [
  {provide: USERS_API_URL, useValue: 'http://localhost:3000/users'},
  {provide: DEFAULT_PAGE_SIZE, useValue: 10}
];
