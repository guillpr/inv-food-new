import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FacadeService } from '../services/facade.service';
import * as bcrypt from 'bcryptjs';
import { Usager } from '../entitees/Usager';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  listeUsager!: Usager[];

  formulaire = this.fb.group({
    courriel: new FormControl(''),
    motPasse:new FormControl(''),
    
  })

  estAuthentifie = false;
  messageErreurCon = false;

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

  soumettreForm(){
   // let passwordHash = bcrypt.hash(this.formulaire.controls.motPasse); 


    const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(this.formulaire.controls.motPasse.value, salt);
    const user = this.formulaire.controls.courriel.value;

    console.log('Liste usager dans soumettre form' , this.listeUsager);
    console.log('Valeur du mot de passe:' , pass);
    let userOk = false;
    let passOk = false;
    this.listeUsager.forEach(element => {
      console.log(element);
      if(element.courrielUsager.toLowerCase() ===  this.formulaire.controls.courriel.value.toLowerCase()){
        userOk=true;
        this.facadeService.idUsager = element.idUsager;
      }
      if(element.motPasseUsager === this.formulaire.controls.motPasse.value){
        passOk=true;
      }
    });


    if(userOk&&passOk){
      this.facadeService.connected = true;
      this.messageErreurCon=false;
      this.router.navigateByUrl('/tabInventaire');
    }
    else{
      this.messageErreurCon=true;
    }
    console.log('Résultat connexion: ' , userOk , passOk) 
  }

}