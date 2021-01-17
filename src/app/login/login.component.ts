import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../securityjwt/services/AuthenticationService";
import {Router} from "@angular/router";
import {servicelog} from "../../securityjwt/services/servicelog";
import {loginrequest} from "../../securityjwt/models/loginrequest";
import { signuprequest } from '../../securityjwt/models/signuprequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public quelformulaire:number=1;
  public quelalerte:number=0;
  signuprequest:signuprequest=new signuprequest();
  signinrequest:loginrequest=new loginrequest();
  errorlogup:String;
  logupreussi:String;
  constructor(private authservice:AuthenticationService,private  servlog:servicelog,private router: Router) {

    // redirect to home if already logged in
    if (this.authservice.currentUserValue) {
      this.router.navigate(['/']);

    }
  }

  ngOnInit(): void {
  }
  login(c){this.authservice.login(c.username,c.password);}
  logup(c){this.servlog.logup(c).subscribe((data)=>{console.log(data);this.logupreussi="inscription reussie";this.quelalerte=2},
    error => {
      this.errorlogup = error;this.quelalerte=1
    }  )}

  tologin(){this.quelformulaire=1}
  tologup(){this.quelformulaire=2}
}
