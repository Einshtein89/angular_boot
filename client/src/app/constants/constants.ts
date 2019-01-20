
export class Constants {
  public static hostUrl: string = 'http://localhost:3000';
  public static books: string = '/books';
  public static users: string = '/users';
  public static photo: string = '/userPhotoUpload';
  public static getBookByCatalogName: string = '/search/getBookByCatalog_Name';
  public static catalogName: string = 'catalogName=';
  public static getBookByCatalogId: string = '/search/getBookByCatalog_Id';
  public static defaultPageSize: number = 10;
  public static signUp: string = '/signup';
  public static changePassword: string= '/changePassword';
  public static orders: string= '/orders';
  public static urlsWithoutRedirect: Array<string> = ['/cart/authorization'];
}
