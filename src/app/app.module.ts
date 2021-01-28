import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoixComponent } from './choix/choix.component';
import { GrapheComponent } from './graphe/graphe.component';
import { PredictionComponent } from './prediction/prediction.component';
import { AideComponent } from './aide/aide.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {choix_service} from "../services/choix_service";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {JwPaginationComponent, JwPaginationModule} from "jw-angular-pagination";
import { NavbarComponent } from './navbar/navbar.component';
import { dataPrediction } from '../services/dataPrediction';
import { MLComponent } from './ml/ml.component';
import { MlData } from '../services/MlData';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "../securityjwt/services/AuthenticationService";
import {servicelog} from "../securityjwt/services/servicelog";
import {ErrorInterceptor} from "../securityjwt/aide/ErrorInterceptor";
import {JwtInterceptor} from "../securityjwt/aide/JwtInterceptor";
import {GraheService} from "../services/graheService";





@NgModule({
  declarations: [
    AppComponent,
    ChoixComponent,
    GrapheComponent,
    PredictionComponent,
    AideComponent,
    NavbarComponent,
    MLComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    JwPaginationModule,


  ],
  providers: [choix_service,
    dataPrediction,
    MlData,
    AuthenticationService,
    GraheService,
    servicelog,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
