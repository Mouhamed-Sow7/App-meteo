import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '235252e0d10059571614fcaf1c075023';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string, lang: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}&lang=${lang}`
    );
  }
}
