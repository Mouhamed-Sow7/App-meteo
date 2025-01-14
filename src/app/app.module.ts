import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router'; //  a inclure pour Import des routes
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component'; // Assurez-vous que WeatherComponent existe

// Définir les routes
const routes: Routes = [
  { path: '', component: WeatherComponent }, // Route par défaut
  { path: '**', redirectTo: '' } // Redirection pour les routes inconnues
];

@NgModule({
  declarations: [
    AppComponent,        // Déclarez AppComponent
    WeatherComponent     // Déclarez WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes) // Ajoutez le RouterModule avec les routes définies
  ],
  providers: [],
  bootstrap: [AppComponent] // AppComponent doit être le point d'entrée
})
export class AppModule { }
