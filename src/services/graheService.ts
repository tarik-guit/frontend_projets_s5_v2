import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";


const AUTH_API = 'http://localhost:8003/GESTIONS/';
@Injectable()
export class GraheService  {

  constructor(private http:HttpClient) { }

  daylyPoids(idp){
    return this.http.get(AUTH_API+"generalData/data_patient/"+idp);
  }
  informationPatien(id){
  return this.http.get(AUTH_API+"cholesterol/cholesterolPredic/"+id);}
}


