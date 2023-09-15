import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  private _eventos: any[] = [];
  widthImg:number = 150;
  marginImg: number = 2;
  showImages = true;
  filtroLista: string = '';
  private _filtrarPor: string = '';
  
  get eventos(): any {
    if(this.filtroLista == '') return this._eventos;
    
    this._filtrarPor = this.filtroLista.toLocaleLowerCase();
    return this._eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(this._filtrarPor) != -1 ||
      evento.local.toLocaleLowerCase().indexOf(this._filtrarPor) != -1
    );
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this._getEventos();
  }

  toggleShowImages() {
    this.showImages = !this.showImages;
  }

  private _getEventos() {
    this.http.get('https://localhost:5001/api/Eventos').subscribe(
     res => this._eventos = res as Array<any>,
     error => console.log(error),
  );
  }
}
