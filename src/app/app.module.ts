import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnregistrerComponent } from './commun/enregistrer.component';
import { EnteteComponent } from './commun/entete.component';
import { FormulaireInventaireComponent } from './commun/formulaire-inventaire.component';
import { LoginComponent } from './commun/login.component';
import { TabInventaireComponent } from './commun/tab-inventaire.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import {MatTooltipModule} from '@angular/material/tooltip';

// Ngx Spinner
import { NgxSpinnerModule } from 'ngx-spinner';

// Toastr
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    EnregistrerComponent,
    EnteteComponent,
    FormulaireInventaireComponent,
    LoginComponent,
    TabInventaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgxSpinnerModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
