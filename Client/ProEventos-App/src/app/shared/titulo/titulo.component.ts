import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent {
  @Input() titulo = "Evento";
  @Input() subtitulo = "Desde 2021";
  @Input() iconClass = "fa fa-user";
  @Input() botaoListar = true;

  constructor(private router: Router) {}

  listar(): void {
    this.router.navigate([`/${this.titulo.toLowerCase()}/lista`]);
  }
}
