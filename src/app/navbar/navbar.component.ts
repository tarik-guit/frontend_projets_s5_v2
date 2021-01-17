import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../securityjwt/services/AuthenticationService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authserv:AuthenticationService) {
  }
  logout(){this.authserv.logout();}

  ngOnInit(): void {
  }

}
