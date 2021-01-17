import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataPrediction } from '../../services/dataPrediction';
import { Donnees1 } from '../../models/Donnees1';
import { choix_service } from '../../services/choix_service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  currentUser: any;
  showedUp:boolean=true;
  showModal:boolean = false;
  id:number=1;
  fumeur:string;
  angina:string;
  diabetique:string;
  diabetique1:boolean;
  fumeur1:boolean;
  chestPain:string;
  sex='';
  sex1:boolean;
  angi:boolean;
  //donnee:Donnees1
  errorMessage=''
  next1:boolean=true;
  next2:boolean=false;
  next3:boolean=false;
  form: any = {};
  form1: any = {};
  form2: any = {};
  Failed1:boolean=false;
  Failed2:boolean=false;
  Failed3:boolean=false;
  bilan:boolean=false;
  enterData:boolean=false;
  serumCholesterol:number;
  typePoids='';
  tt:boolean=false;
  idCholest:number=1;
  choix:boolean=false;
  constructor(private router: Router,private dataService: dataPrediction,private choixCurrent:choix_service) { }

  ngOnInit(): void {
    this.getElementChoisi();
  }

getElementChoisi(){
  this.id=this.choixCurrent.currentpatient.id;
  if(!this.id){
    this.choix=false;
  }
  else
  this.choix=true;
}

  onClose() {
    this.showModal = false;
    //Allow fade out animation to play before navigating back

  }
  chestPain1(){
    document.getElementById("chest").click();

  }


  bpm(){

   document.getElementById("bpm").click();
  }

  angina1(){
    document.getElementById("angina").click();

  }


  bilanLipide() {
    this.bilan=true;

  }
  save1(){



    if(this.sex === 'Homme'){
      this.sex1=true;
    }
    else if(this.sex === 'Femme'){
      this.sex1=false;
    }
    if(this.diabetique === 'oui'){
      this.diabetique1=true;
    }
    else if(this.diabetique === 'non'){
      this.diabetique1=false;
    }
    if(this.fumeur === 'oui'){
      this.fumeur1=true;
    }
    else if(this.fumeur === 'non'){
      this.fumeur1=false;
    }
    if(this.angina === 'oui'){
      this.angi=true;
    }
    else if(this.angina === 'non'){
      this.angi=false;
    }
console.log(this.chestPain)
    this.form=new Donnees1(0,this.form.age,this.sex1,this.chestPain,this.form.bloodPressure,this.diabetique1,this.form.maximumHeart,this.angi,this.form.poids,this.form.taille,this.fumeur1);


    this.dataService.addDonnees1(this.form,this.id,this.idCholest).subscribe(
      data => {
        console.log("ttttt")
        let st:number=this.form.taille;
        let str:string=''+st;

        if(str.indexOf(".") === -1){
          this.tt=true;
          console.log("yyy")
        }
        else{
          this.tt=false;
          this.next2=false;
          //this.next2=true;
        //this.next1=false;
        this.router.navigate(['ML']);
      }

      },
      err => {
        this.Failed1=true;
        this.errorMessage = err.error.message;



      },

    );


  }


  save2(){
    this.dataService.addDonnees2(this.form1,this.id).subscribe(
      data => {
        this.bilan=false;
        this.next1=false;
        this.next2=true;
        this.idCholest=data['id'];
        console.log("dataaaaa  "+data);
        this.serumCholesterol=this.form1.hdl+this.form1.ldl+this.form1.triglycerides*0.2;
        console.log(this.serumCholesterol);
        localStorage.setItem('choles',this.serumCholesterol.toString());



      },
      err => {
        this.Failed2=true;
        this.errorMessage = err.error.message;

      }
    );
  }





  // save3(){
  //   this.dataService.addCholesterol(this.form2,this.id).subscribe(
  //     data => {
  //       this.next3=false;

  //       this.router.navigate(['prediction']);
  //     },
  //     err => {
  //       this.Failed3=true;
  //       this.Failed2=false;
  //       this.errorMessage = err.error.message;

  //     }
  //   );
  // }




}
