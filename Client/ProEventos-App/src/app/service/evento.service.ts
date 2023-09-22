import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl: string = "https://localhost:5001/api/eventos";

  constructor(private http: HttpClient) { }

  public getEventos():Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl);
  }

  public getEventoById(id: number):Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/${id}`);
  }

  public getEventoByTema(tema: string):Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/${tema}/tema`);
  }
 }
