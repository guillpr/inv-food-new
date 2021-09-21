import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent implements OnInit {
  @ViewChild('myCheck')
  myCheckRef!: ElementRef;

  constructor(public facadeService: FacadeService,
    public router: Router) { }

  ngOnInit(): void {
    console.log('Dans entete');
    console.log('idUsager:' , this.facadeService.idUsager);

    if(this.facadeService.idUsager){
      this.facadeService.ObtenirUsagerParId(this.facadeService.idUsager)
      .subscribe((r=>{
        console.log('Résultat obt usager par id:' , r);
        this.facadeService.listeUsageId = r;
        console.log('this.facadeService.listeUsageId' , this.facadeService.listeUsageId.prenomUsager)
        
      }))
    }
   



   
  }

  resetCheck(){
    console.log('Reset check');
    
   

   
      this.myCheckRef.nativeElement.checked = false;
     
    
  }
  disconnect(){
    this.facadeService.idUsager = undefined!;
    this.facadeService.listeUsageId = undefined!;
    this.facadeService.connected = false;
    this.router.navigateByUrl('/login');
  }
 
 
   
  

}
