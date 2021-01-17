import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

import {HttpClient} from "@angular/common/http";
import { User } from "../models/User";


@Injectable()
export  class AuthenticationService  {




  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  // @ts-ignore
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    this.http.post<any>("http://localhost:8003/SECURITY/signin", { username, password })
      .subscribe(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        location.reload(true);
        return user;
        // tslint:disable-next-line:no-empty
      } ,(error) =>{});    }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    document.location.reload(true);
  }
}



