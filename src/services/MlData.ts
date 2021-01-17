import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import { Cardi } from '../app/ml/types';

@Injectable()
export  class MlData{




  constructor(private  http:HttpClient) {
  }

  getToken(): Observable<any>{
    return this.http.get('http://localhost:8003/CTOML/token');
  }

  trainModel():Observable<any>{
    return this.http.get('http://localhost:8003/CTOML/train')
  }

  public predictCardi(cardi: Cardi): Observable<any> {
    return this.http.post('http://localhost:8003/CTOML/predict', cardi);
  }


}
