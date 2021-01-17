import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import { Donnees1 } from '../models/Donnees1';


const AUTH_API = 'http://localhost:8003/GESTIONS/';
@Injectable()
export  class dataPrediction{

  constructor(private  http:HttpClient) {
  }

  addDonnees1(donnees1,id,idc){
    return this.http.post(AUTH_API+'generalData/data_pre/'+id+'/'+idc,donnees1);

  }

  getLastUserDetails(userId){
    return this.http.get<Donnees1>(AUTH_API+'generalData/patient/last/'+userId);
  }

  addDonnees2(donnees2,id){
    return this.http.post(AUTH_API+'cholesterol/addCholesterol/'+id,donnees2);

  }




}
