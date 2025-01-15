import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-weather',
  standalone: false,

  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  city: string = 'Dakar';
  weatherData: any = null;
  errorMessage: string = '';
  setsun: string = '';
  risesun: string = '';
  constructor(private weatherService: WeatherService) {}

  getWeather(): void {
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = '';
        let lever = new Date(this.weatherData.sys.sunrise * 1000);
        this.risesun = lever.toLocaleTimeString();
        let coucher = new Date(this.weatherData.sys.sunset * 1000);
        this.setsun = coucher.toLocaleTimeString();
      },
      error: (err) => {
        this.weatherData = null;
        this.errorMessage = 'Ville introuvable ou problème de connexion.';
      },
    });
  }
  getweatherDate(): void {}
}
