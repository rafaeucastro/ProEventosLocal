import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/evento';
import { EventoService } from '@app/service/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit {
  private _eventos: Evento[] = [];
  private _filtrarPor: string = '';

  public widthImg: number = 150;
  public marginImg: number = 2;
  public showImages = true;
  public filtroLista: string = '';
  public modalRef?: BsModalRef;
  public message?: string;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._getEventos();
  }

  get eventos(): any {
    if (this.filtroLista == '') return this._eventos;

    this._filtrarPor = this.filtroLista.toLocaleLowerCase();
    return this._eventos.filter(
      (evento) =>
        evento.tema.toLocaleLowerCase().indexOf(this._filtrarPor) != -1 ||
        evento.local.toLocaleLowerCase().indexOf(this._filtrarPor) != -1
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.toastr.success('O evento foi deletado com sucesso', 'Deletado');
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }

  toggleShowImages() {
    this.showImages = !this.showImages;
  }

  private _getEventos() {
    this.eventoService.getEventos().subscribe(
      (responseEventos) => (this._eventos = responseEventos),
      (error) => console.log(error)
    );
  }

  public detalheEvento(id: number) {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
}
