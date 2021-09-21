import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnregistrerComponent } from './commun/enregistrer.component';
import { FormulaireInventaireComponent } from './commun/formulaire-inventaire.component';
import { LoginComponent } from './commun/login.component';
import { TabInventaireComponent } from './commun/tab-inventaire.component';

const routes: Routes = [
  {path:'',component:LoginComponent },
  {path:'login',component:LoginComponent },
  {path:'enregistrer',component:EnregistrerComponent },
  {path:'formulaireInventaire', component:FormulaireInventaireComponent},
  {path:'tabInventaire',component:TabInventaireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
