import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '@app/models/lote';
import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';

@Injectable()
export class LoteService {

  baseUrl: string = "https://localhost:5001/api/lotes";

  constructor(private http: HttpClient) { }

  public getLotesByEventoId(eventoId: number):Observable<Lote[]> {
    return this.http
    .get<Lote[]>(`${this.baseUrl}/${eventoId}`)
    .pipe(take(1));
  }

  public saveLotes(eventoId: number, lotes: Lote[]):Observable<Lote[]> {
    return this.http
    .put<Lote[]>(`${this.baseUrl}/${eventoId}`, lotes)
    .pipe(take(1));
  }

  public deleteLote(eventoId: number, id: number):Observable<any> {
    return this.http
    .delete<any>(`${this.baseUrl}/${eventoId}/${id}`)
    .pipe(take(1));
  }
}
