import {USERS_API_URL, REGISTER_API_URL} from "../services/user/user.service";
import {DEFAULT_PAGE_SIZE, DEFAULT_SORT} from "../services/pagination.service";
import {LANGUAGE_API_URL} from "../services/language.service";

export var constants: Array<any> = [
  {provide: USERS_API_URL, useValue: 'http://localhost:3000/users'},
  {provide: DEFAULT_PAGE_SIZE, useValue: 10}
];

export class Constants {
  public static hostUrl: string = 'http://localhost:3000';
  public static books: string = '/books';
  public static getBookByCatalogName: string = '/search/getBookByCatalog_Name';
  public static catalogName: string = 'catalogName=';
  public static getBookByCatalogId: string = '/search/getBookByCatalog_Id';
}
