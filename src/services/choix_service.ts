import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export  class choix_service{



  currenthopital:any=[];
  currentpatient:any=[];
  constructor(private  http:HttpClient) {
  }

creerpatientpourhopitalid(id,c){return this.http.post("http://localhost:8003/GESTIONS/patient/hospital/"+id,c);}

modifierpatient(id,c){this.http.put("http://localhost:8003/GESTIONS/patient/updatePatient/"+id,c).subscribe(data=>{console.log(data)})}

supprimerpatient(id){this.http.delete("http://localhost:8003/GESTIONS/patient/"+id).subscribe(data=>{} ,err=>{   })}

getpatientbyid(id){this.http.get("http://localhost:8003/GESTIONS/patient/"+id).subscribe(data=>{} ,err=>{   })}
 /* hopitaux: */

  supprimerhopitalbyid(id){this.http.delete("http://localhost:8003/GESTIONS/hospital/hopital/"+id).subscribe(data=>console.log(data) )}

  creerhopital(c){return this.http.post("http://localhost:8003/GESTIONS/hospital/hopital",c)}

  gethopitauxpourcurrentuser(){return this.http.get("http://localhost:8003/GESTIONS/hospital/hopitalscurr");}
   updatehopital(id,c){return this.http.put("http://localhost:8003/GESTIONS/hospital/hopital/"+id,c);}

   getpatientsforcurrenthopital(p){return this.http.get("http://localhost:8003/GESTIONS/patient/patient_hospital/"+p.id)}

   getdatapersonnelle(p){return this.http.get("http://localhost:8003/GESTIONS/personnelle/personal_patient/"+p.id);}

   creerdataperso(id,c){return this.http.post("http://localhost:8003/GESTIONS/personnelle/addPersonal/"+id,c)}
   supprimerdataperso(p){this.http.delete("http://localhost:8003/GESTIONS/personnelle/data_personnelle/"+p.id).subscribe(data=>console.log(data) )}

}
