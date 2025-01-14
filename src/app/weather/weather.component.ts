import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-weather',
  standalone: false,
  
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  city: string = 'Dakar';
  weatherData: any = null;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  getWeather(): void {
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.weatherData = null;
        this.errorMessage = 'Ville introuvable ou problème de connexion.';
      }
    });
  }

}
