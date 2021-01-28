import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GraheService} from "../../services/graheService";
import {choix_service} from "../../services/choix_service";
import {ModelData} from "./ModelData";
import {Chart} from 'Chart.js'
@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.css']
})
export class GrapheComponent implements OnInit {
  currenthopital:any=[];
  currentpatient:any=[];
  data:Object;
  chart =[];
  chart1=[];
  chart3 = [];
  constructor(private graphe:GraheService,private choixserv: choix_service) { }

  ngOnInit(): void {
    this.currenthopital=this.choixserv.currenthopital;
    this.currentpatient=this.choixserv.currentpatient;
    console.log(this.currenthopital);
    console.log(this.currentpatient);
    this.graphe.daylyPoids(this.currentpatient.id).subscribe(
      res=>{
        console.log(res);
        let table:any = [];
        table = res;
        let allpoid = table.map(c=>c.poids);
        let alldate = table.map(c=>c.createddate);
        console.log(allpoid);
        this.chart3 = new Chart('canvas3',{
          type:'line',
          data:{
            labels:alldate,
            datasets: [
              {
                data: allpoid,
                borderColor: '#59bd12',
                fill:false
              },
            ]
          },
          options:{
            legend:{
              display:false
            },
            scales:{
              wAxes:[{
                display:true
              }],
              yAxes:[{
                display:true
              }]
            }
          }
        })
      }
    )

    this.graphe.informationPatien(this.currentpatient.id).subscribe(
      res=>{
        console.log(res);
        let tabdata:any = [];
        tabdata = res;
         let alldate = tabdata.map(c=>c.createddate);
         let hdl= tabdata.map(c=>c.hdl);
         let ldl= tabdata.map(c=>c.ldl);
         let colest = tabdata.map(c=>c.triglycerides)
          //opp
        let datacol = [];
         tabdata.forEach((res)=>{
           datacol.push(res.hdl+res.ldl+(0.2*res.triglycerides));
         })
        console.log(datacol);
        console.log(alldate);
        let dateForm =[];
        alldate.forEach((res)=>{
          let jsdate = new Date(res*1000);
          dateForm.push(jsdate.toLocaleTimeString('en', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}))
        })
        console.log(dateForm);
        this.chart = new Chart('canvas',{
          type:'line',
          data:{
            labels:alldate,
            datasets: [
              {
                data: hdl,
                borderColor: '#3cba9f',
                fill:false
              },
              {
                data: ldl,
                borderColor: '#eec800',
                fill:false
              },
              {
                data: colest,
                borderColor: '#ee6700',
                fill:false
              },
            ]
          },
          options:{
            legend:{
              display:false
            },
            scales:{
              wAxes:[{
                display:true
              }],
              yAxes:[{
                display:true
              }]
            }
          }
        })


        //
        this.chart1 = new Chart('canvas1',{
          type:'line',
          data:{
            labels:alldate,
            datasets: [
              {
                data: datacol,
                borderColor: '#e20f72',
                fill:false
              },

            ]
          },
          options:{
            legend:{
              display:false
            },
            scales:{
              wAxes:[{
                display:true
              }],
              yAxes:[{
                display:true
              }]
            }
          }
        })


      }


    )

  }

}
