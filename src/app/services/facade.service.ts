import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Type } from '../entitees/type';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CommandCreateDto } from '../entitees/CommandCreateDto';
import { Produit } from '../entitees/produit';
import { Usager } from '../entitees/Usager';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  //Liste objets
  //Liste objets

  //Liste objets
  //Liste objets

  //Liste objets
  //Liste objets
  //Liste objets
  //Liste objets

  public listeType!: Type[];
  public listeProduit!: Produit[];
  public idUsager!: number;
  public listeUsageId!: Usager;
  public connected!: boolean;

  // URL
  private typeProduitUrl = environment.apiBaseUrl + "Produits/type";
  private typeCommandUrl = environment.apiBaseCommandUrl + "commands";
  private produitUrl = environment.apiBaseCommandUrl + "Produit";
  private usagerUrl = environment.apiBaseCommandUrl + 'Usager';

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };
  

  constructor(private http: HttpClient) { }

  // Requête GET
  public ObtenirTypeProduit(id: number):Observable<Type[]>{
    return this.http.get<Type[]>(this.typeCommandUrl + '?id='+id);
  }
  public ObtenirTousLesProduits(idUsager: number):Observable<Produit[]>{
    return this.http.get<Produit[]>(this.produitUrl + '?idUsager=' + idUsager);
  }
  public ObtenirTousUsagers():Observable<Usager[]>{
    return this.http.get<Usager[]>(this.usagerUrl);
  }
  public ObtenirUsagerParId(idUsager:number):Observable<Usager>{
    return this.http.get<Usager>(this.usagerUrl + '/' + idUsager )
  }
  // Requête POST
  public AjouterNouveauProduit(nom: CommandCreateDto):Observable<Type>{
    return this.http.post<Type>(this.typeCommandUrl,JSON.stringify(nom), this.httpOptions)
  }
  public AjoutProduitInventaire(prod: Produit):Observable<Produit>{
    return this.http.post<Produit>(this.produitUrl , JSON.stringify(prod), this.httpOptions)
  }
  public AjoutUtilisateur(usager: Usager):Observable<Usager>{
    return this.http.post<Usager>(this.usagerUrl, JSON.stringify(usager), this.httpOptions);
  }

  // Requête DELETE
  public SupprimerProduitInventaire(id: number){
    return this.http.delete(this.produitUrl + '/' + id)
  }
}
