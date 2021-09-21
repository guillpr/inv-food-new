import { Type } from "@angular/core";

export class Produit{
    public id!: number;
    public nom!: string;
    public quantite!: string;
    public description!: string;
    public date!: Date;
    public idUsager!: number;
    public idCommand!: number;

    constructor() {
    }
}