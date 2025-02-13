import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router'; //  a inclure pour Import des routes
import {
  HttpClientModule,
  withFetch,
  provideHttpClient,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component';
import { FooterComponent } from './footer/footer.component';

// Définir les routes
const routes: Routes = [
  { path: '', component: WeatherComponent }, // Route par défaut
  { path: '**', redirectTo: '' }, // Redirection pour les routes inconnues
];

@NgModule({
  declarations: [AppComponent, WeatherComponent, FooterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
