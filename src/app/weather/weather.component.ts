import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { suggestionsList } from '../shared/suggestion';
import { ViewEncapsulation } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  standalone: false,
  styleUrls: ['./weather.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent implements OnInit {
  // Propriétés du composant
  city: string = 'Dakar'; // Ville sélectionnée pour récupérer la météo
  weatherData: any = null; // Données météo récupérées de l'API
  errorMessage: string = ''; // Message d'erreur en cas de problème
  setsun: string = ''; // Heure du coucher du soleil
  risesun: string = ''; // Heure du lever du soleil
  weatherCondition: string = ''; // Condition météo actuelle
  lang: string = 'fr'; // Langue pour les données météo (par défaut, français)
  todayDate: string = ''; // Date du jour au format lisible
  suggestions: string[] = [];
  currentTime!: Date;

  // Constructeur : Injection du service météo
  constructor(private weatherService: WeatherService) {}

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * - Récupère la météo pour la ville sélectionnée.
   * - Définit la date du jour.
   */
  ngOnInit(): void {
    this.setTodayDate(); // Définit la date du jour
    this.getWeather(); // Récupération des données météo
    this.currentTime = new Date();
    // timer(0, 1000).subscribe(() => {
    //   this.currentTime = new Date();
    // });
  }

  /**
   * Récupère les données météo pour la ville sélectionnée.
   * - Affiche un message d'erreur si la ville n'est pas valide.
   * - Détermine la condition météo et les suggestions associées.
   */
  getWeather(): void {
    if (!this.city || this.city.trim() === '') {
      // Si la ville est vide, on affiche une suggestion par défaut
      this.suggestions = this.getSuggestions('none');
      this.weatherData = null; // Réinitialisation des données météo
      this.errorMessage = 'Veuillez entrer une ville.'; // Message d'erreur
      return;
    }

    // Appel au service météo pour récupérer les données
    this.weatherService.getWeather(this.city, this.lang).subscribe({
      next: (data) => {
        this.weatherData = data; // Stocke les données récupérées
        this.errorMessage = ''; // Réinitialise le message d'erreur

        // Conversion des timestamps en heures lisibles
        const lever = new Date(this.weatherData.sys.sunrise * 1000);
        this.risesun = lever.toLocaleTimeString();
        const coucher = new Date(this.weatherData.sys.sunset * 1000);
        this.setsun = coucher.toLocaleTimeString();

        // Détermination de la condition météo (chaud, froid, pluie, etc.)
        const temp = this.weatherData.main.temp;
        const weatherMain = this.weatherData.weather[0].main.toLowerCase();
        this.weatherCondition = this.getWeatherCondition(weatherMain, temp);

        // Génération des suggestions basées sur la condition météo
        this.suggestions = this.getSuggestions(this.weatherCondition);
      },
      error: () => {
        // Gestion des erreurs (par exemple, ville introuvable ou problème de connexion)
        this.weatherData = null;
        this.errorMessage = 'Ville introuvable ou problème de connexion.';
      },
    });
  }

  /**
   * Définit la date du jour au format lisible.
   * - Format : Jour Mois Année (exemple : "vendredi 17 janvier 2025").
   */
  setTodayDate(): void {
    const today = new Date();
    this.todayDate = today.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Détermine la condition météo en fonction de la température et des données météo principales.
   * @param weatherMain - Description principale de la météo (ex. : pluie, soleil).
   * @param temp - Température actuelle.
   * @returns Une chaîne représentant la condition météo (ex. : 'hot', 'cold', 'rainy').
   */
  getWeatherCondition(weatherMain: string, temp: number): string {
    if (temp > 30) {
      return 'hot';
    } else if (temp < 10) {
      return 'cold';
    } else if (weatherMain.includes('rain')) {
      return 'rainy';
    } else {
      return 'mild';
    }
  }

  /**
   * Génère des suggestions en fonction de la condition météo actuelle.
   * @param condition - La condition météo actuelle (ex. : 'hot', 'rainy').
   * @returns Une liste de suggestions (ex. : 'Portez un chapeau' pour 'hot').
   */
  getSuggestions(condition: string): string[] {
    if (condition === 'none') {
      return ['Aucune suggestion disponible'];
    }
    const match = suggestionsList.find((s) => s.condition === condition);
    return match ? match.suggestions : ['Aucune suggestion disponible'];
  }
}
