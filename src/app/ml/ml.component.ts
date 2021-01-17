import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataPrediction } from '../../services/dataPrediction';
import { choix_service } from '../../services/choix_service';
import { Donnees1 } from '../../models/Donnees1';
import { MlData } from '../../services/MlData';
import {
  SVCParameters,
  SVCResult,
  Cardi,
  ProbabilityPrediction
} from "./types";

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.css']
})
export class MLComponent implements OnInit {
  details:Donnees1;
  id:number=1;
  genre:number;
  angi:number;
  message='';
  errorMessage='';
  cardi:Cardi;
  cholesterol:number;
  goPrediction:boolean=false;
  prediMsg:boolean=false
  prediction:boolean=false;
  cholest:number;

  public svcParameters: SVCParameters = new SVCParameters();
  public svcResult: SVCResult;
  public probabilityPredictions: ProbabilityPrediction;

  constructor(private router: Router,private dataService: dataPrediction,private choixCurrent:choix_service,private mlService:MlData) { }

  ngOnInit(): void {
    this.id=this.choixCurrent.currentpatient.id;
    this.getUserDetails();
  }






  getUserDetails(){
    this.dataService.getLastUserDetails(this.id).subscribe(
      data =>{
        this.details=data;
        console.log(this.details)
        console.log(this.details.age);
        if(this.details.sex === false){
          this.genre=0
        }
        else if(this.details.sex === true){
          this.genre=1
        }

        if(this.details.angina === false){
          this.angi=0
        }
        else if(this.details.angina === true){
          this.angi=1
        }
        // this.getUsercholesterol();
        this.cholest=JSON.parse(localStorage.getItem('choles'));
        //this.cholest=220;
        this.cardi=new Cardi(this.details.age,this.genre,this.details.bloodPressure,this.cholest,this.details.maximumHeart,this.angi);
        console.log("choleeee "+localStorage.getItem('choles'));
      },
      err => {

        this.errorMessage = err.error.message;
      }
    );
  }


  public trainModel() {
    this.mlService.getToken();
    this.mlService.trainModel().subscribe((svcResult) => {
                this.svcResult = svcResult;
                this.prediction=true;
            });
        }


  public predictIris() {
    this.mlService.predictCardi(this.cardi).subscribe(data => {
              this.probabilityPredictions=data
              if(data.results === 1){
                this.message="Vous êtes sujet à un arrêt cardiaque";
                this.prediMsg=true
              }
              else if(data.results === 0){
                this.message="Heureusement , vous n'êtes pas sujet à un arrêt cardiaque";
                this.prediMsg=false;
              }
              });
          }



}
