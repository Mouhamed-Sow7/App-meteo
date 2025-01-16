import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Suggestion, suggestionsList } from '../shared/suggestion';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  standalone: false,
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  city: string = 'Dakar';
  weatherData: any = null;
  errorMessage: string = '';
  setsun: string = '';
  risesun: string = '';
  weatherCondition: string = '';
  lang: string = 'fr';

  suggestions: string[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather(); // Chargement par défaut
  }
  getWeather(): void {
    if (!this.city || this.city.trim() === '') {
      // Si la ville est vide, on affiche une suggestion par défaut
      this.suggestions = this.getSuggestions('none'); // 'none' comme condition par défaut
      this.weatherData = null; // Réinitialiser les données météo
      this.errorMessage = 'Veuillez entrer une ville.';
      return;
    }
    this.weatherService.getWeather(this.city, this.lang).subscribe({
      // rajout de parametre lang pour en français
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = '';

        // Conversion des timestamps ou horodatage en heures lisibles
        let lever = new Date(this.weatherData.sys.sunrise * 1000);
        this.risesun = lever.toLocaleTimeString();
        let coucher = new Date(this.weatherData.sys.sunset * 1000);
        this.setsun = coucher.toLocaleTimeString();

        // Déterminer la condition météo
        const temp = this.weatherData.main.temp;
        const weatherMain = this.weatherData.weather[0].main.toLowerCase();

        this.weatherCondition = this.getWeatherCondition(weatherMain, temp);

        // Obtenir les suggestions
        this.suggestions = this.getSuggestions(this.weatherCondition);
      },
      error: (err) => {
        this.weatherData = null;
        this.errorMessage = 'Ville introuvable ou problème de connexion.';
      },
    });
  }

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

  getSuggestions(condition: string): string[] {
    if (condition === 'none') {
      return ['Aucune suggestion disponible'];
    }
    const match = suggestionsList.find((s) => s.condition === condition);
    return match ? match.suggestions : ['Aucune suggestion disponible'];
  }
}
