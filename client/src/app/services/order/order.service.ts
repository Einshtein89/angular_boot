import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Constants} from "../../constants/constants";
import {Book} from "../../models/book.model";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/user.model";

@Injectable()
export class OrderService {
  private ordersUrl = `${Constants.hostUrl}${Constants.orders}`;
  private options = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  private userOrders = new BehaviorSubject<Map<Book, number>>(null);
  public userOrdersAsObservable = this.userOrders.asObservable();

  constructor(private http: HttpClient){}

  public placeOrder(ordersMap: Map<Book, number>) : Observable<any> {
    //we need to convert TypeScript Map() to object before send in http request
    let convertedMap = {};
    let index = 0;
    ordersMap.forEach((val: number, key: Book) => {
      convertedMap[val + "_" +index++] = key;
    });
    return this.http.post(this.ordersUrl, convertedMap, this.options)
      .do(() => this.userOrders.next(ordersMap))
      .catch(this._handleError)
  }

  public getOrder(userId: string) : Observable<any> {
    return this.http.get(`${this.ordersUrl}?userId=${userId}`)
      // .do(() => this.userOrders.next(ordersMap))
      .catch(this._handleError)
  }

  private _handleError (error: HttpResponse<any> | any) {
    return Observable.throw(error);
  }
}
