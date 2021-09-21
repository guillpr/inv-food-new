import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usager } from '../entitees/Usager';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.component.html',
  styleUrls: ['./enregistrer.component.css']
})
export class EnregistrerComponent implements OnInit {

  courrielUtilise=false;
  listeUsager!: Usager[];

  formulaire = this.fb.group({
    nomUsager: ['',[Validators.required,Validators.maxLength(50)]],
    prenomUsager: ['',[Validators.required,Validators.maxLength(50)]],
    courriel: ['',[Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    motPasse:['', [Validators.required,Validators.maxLength(10)]], 
    motPasseConf:['']
  },{validators: this.checkPasswords})

  constructor(public facadeService: FacadeService,
    public fb: FormBuilder,
    public router: Router) { }

  ngOnInit(): void {
    this.facadeService.ObtenirTousUsagers()
    .subscribe((r=>{
      console.log('Résultat tous usagers:' , r);
      this.listeUsager= r;
      console.log('id usager dans login' , this.facadeService.idUsager);
    }))
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  
 
 
  const password = group.get('motPasse')!.value;
  const confirmPassword = group.get('motPasseConf')!.value;

  const passl = group.get('motPasse')!.value.length;

  if( password !== confirmPassword){
    return { notSame: true } ;
  }
  console.log('Long:' ,passl);
  if(password.length > 10){
    console.log('Dans trop long');
    return{passTropLong:true}
  }

  return  null;  

  
}
  soumettreForm(){
    this.courrielUtilise = false;
    console.log('dans soumettre form' , this.formulaire)

  
    console.log('liste usager' , this.listeUsager)
    

    let objUsager: Usager ={
      idUsager:0,
      nomUsager: this.formulaire.controls.nomUsager.value,
      prenomUsager:this.formulaire.controls.prenomUsager.value,
      courrielUsager: this.formulaire.controls.courriel.value.toLowerCase(),
      motPasseUsager: this.formulaire.controls.motPasse.value
      //motPasseUsager: pass
    }
    console.log('objUsager' ,objUsager);

    this.listeUsager.forEach(element => {
      console.log(element);
      if(element.courrielUsager.toLowerCase() ===  this.formulaire.controls.courriel.value.toLowerCase()){
        
       this.courrielUtilise = true
      }
     
      
    });

    if(this.courrielUtilise === false){
      this.facadeService.AjoutUtilisateur(objUsager)
      .subscribe(((r: any)=>{
        console.log('Réponse r:' ,r);
        this.router.navigateByUrl('/login');
      }));
    }
    

  }

}
