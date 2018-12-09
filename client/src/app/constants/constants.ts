import {USERS_API_URL, REGISTER_API_URL} from "../services/user.service";
import {DEFAULT_PAGE_SIZE, DEFAULT_SORT} from "../services/pagination.service";
import {LANGUAGE_API_URL} from "../services/language.service";

export var constants: Array<any> = [
  {provide: USERS_API_URL, useValue: 'http://localhost:3000/users'},
  {provide: DEFAULT_PAGE_SIZE, useValue: 10}
];
