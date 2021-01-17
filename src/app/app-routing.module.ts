import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChoixComponent} from "./choix/choix.component";
import {PredictionComponent} from "./prediction/prediction.component";
import {GrapheComponent} from "./graphe/graphe.component";
import {AideComponent} from "./aide/aide.component";
import {MLComponent} from "./ml/ml.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../securityjwt/aide/AuthGuard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'choix', component: ChoixComponent,canActivate: [AuthGuard]},
  {path: 'graphe', component: GrapheComponent,canActivate: [AuthGuard]},
  {path: 'prediction', component: PredictionComponent,canActivate: [AuthGuard]},
  {path: 'aide', component: AideComponent,canActivate: [AuthGuard]},
  {path: 'ML', component: MLComponent ,canActivate: [AuthGuard]},
  {path: '', redirectTo:'/choix', pathMatch:'full' ,canActivate: [AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
