import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommandCreateDto } from '../entitees/CommandCreateDto';
import { Produit } from '../entitees/produit';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-formulaire-inventaire',
  templateUrl: './formulaire-inventaire.component.html',
  styleUrls: ['./formulaire-inventaire.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormulaireInventaireComponent implements OnInit {

  ajoutProduit = false;
  idUsagerTest = 1;

  formulaire = this.fb.group({
    typeProduit: new FormControl(''),
    nouveauProduit: new FormControl(''),
    quantite: new FormControl(''),
    unite: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    idCommandFc: new FormControl('')
  });

  constructor(public facadeService: FacadeService,
              public fb: FormBuilder,
              public router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService)
              { }

  ngOnInit(): void {
    console.log('Début ngOnInit');
    if (this.facadeService.idUsager){

   this.spinner.show();
   this.facadeService.ObtenirTypeProduit(this.facadeService.idUsager)
    .subscribe((res) => {
      console.log('Liste type' , res);
      this.facadeService.listeType = res;
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 500);

      console.log('listetypeListe' , this.facadeService.listeType);
    });
  }
  else{
    this.router.navigateByUrl('/login');
  }

  }
  ajouterProduit(){
    if (this.ajoutProduit == false){
      this.ajoutProduit = true;
    }
    else{
      this.ajoutProduit = false;
    }
    console.log('Valeur du formulaire' , this.formulaire);
  }
  ajouterNouveauProduit(){
    if (this.formulaire.controls.nouveauProduit.value !== ''){
      console.log('Valeur champs:', this.formulaire.controls.nouveauProduit.value);
      let cmd: CommandCreateDto;
      cmd = {
      nom: this.formulaire.controls.nouveauProduit.value,
      idUtilisateur: this.facadeService.idUsager

     };
      this.facadeService.AjouterNouveauProduit(cmd)
      .subscribe((s => {
        console.log(s);
        this.ngOnInit();
      }));

    }
  }
  supprimerChangements(){
    console.log('dans supprimer changements');
    if (this.formulaire.controls.nouveauProduit.value !== ''){
      console.log('nouveau produits pas vide');
      this.formulaire.get('nouveauProduit')?.setValue('');
      this.ajoutProduit = false;
    }
    else{
      this.ajoutProduit = false;
      console.log('nouveau produits vide');
    }
  }
  soumettreProduit(){
    if (this.formulaire.controls.typeProduit.value !== ''){
      if (this.formulaire.controls.date.value == ''){
        this.formulaire.controls.date.setValue(new Date('0001-01-01'));
      }
      let prod: Produit;
      prod = {
        id: 0,
        nom: this.formulaire.controls.typeProduit.value,
        quantite: this.formulaire.controls.quantite.value + ' ' + this.formulaire.controls.unite.value,
         description: this.formulaire.controls.description.value,
         date: this.formulaire.controls.date.value,
         idUsager: this.facadeService.idUsager,
         idCommand: this.facadeService.listeType[0].id
      };
      console.log('prod', prod);

      this.facadeService.AjoutProduitInventaire(prod)
       .subscribe((s) => {
         console.log(s);
         this.toastr.success('Produits ajouté à  l\'\inventaire avec succès.');
       }, err => {this.toastr.error('Problème avec l\'\ajout du produit à l\'\inventaire.');}
       );
    }
  }
}

