import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl: string = "https://localhost:5001/api/eventos";

  constructor(private http: HttpClient) { }

  public getEventos():Observable<Evento[]> {
    return this.http
    .get<Evento[]>(this.baseUrl)
    .pipe(take(1));
  }

  public getEventoById(id: number):Observable<Evento> {
    return this.http
    .get<Evento>(`${this.baseUrl}/${id}`)
    .pipe(take(1));
  }

  public getEventoByTema(tema: string):Observable<Evento> {
    return this.http
    .get<Evento>(`${this.baseUrl}/${tema}/tema`)
    .pipe(take(1));
  }

  public postEvento(evento: Evento):Observable<Evento> {
    return this.http
    .post<Evento>(this.baseUrl, evento)
    .pipe(take(1));
  }

  public putEvento(evento: Evento):Observable<Evento> {
    return this.http
    .put<Evento>(`${this.baseUrl}/${evento.id}`, evento)
    .pipe(take(1));
  }

  public deleteEvento(id: number):Observable<string> {
    return this.http
    .delete<string>(`${this.baseUrl}/${id}`)
    .pipe(take(1));
  }
 }
