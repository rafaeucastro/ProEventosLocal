import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { Evento } from '../models/evento';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl: string = environment.apiURL + "api/eventos";

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

  public postUploadImage(eventoId: number, file: File): Observable<Evento> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
    .post<Evento>(`${this.baseUrl}/upload-image/${eventoId}`, formData)
    .pipe(take(1));
  }
 }
