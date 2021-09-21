import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-tab-inventaire',
  templateUrl: './tab-inventaire.component.html',
  styleUrls: ['./tab-inventaire.component.css']
})
export class TabInventaireComponent implements OnInit {



  constructor(public facadeService: FacadeService,
    public router: Router) { }

  ngOnInit(): void {
    console.log('connected ? tab inv' , this.facadeService.connected)
    
    if(this.facadeService.idUsager){

  
    this.facadeService.ObtenirTousLesProduits(this.facadeService.idUsager)
    .subscribe((s=>{
      console.log('Retour liste' , s);
      this.facadeService.listeProduit=s;
    }))
  }
  else{
    this.router.navigateByUrl('/login');
  }  
  }
  supprimerProduit(id: number){
    console.log('Dans supprimer produit');
    this.facadeService.SupprimerProduitInventaire(id)
    .subscribe((d =>{
      console.log('Suppression');
      this.ngOnInit();
    }));
  }
}
