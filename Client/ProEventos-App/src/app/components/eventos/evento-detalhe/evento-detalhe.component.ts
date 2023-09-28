import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventoService } from '@app/service/evento.service';
import { Evento } from '@app/models/evento';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Lote } from '@app/models/lote';
import { LoteService } from '@app/service/lote.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  form: FormGroup;
  evento = {} as Evento;
  deveCriarEvento = true;
  public modalRef?: BsModalRef;
  public loteAtual = {indice: 0, id: 0, nome: ''};

  constructor(private fb: FormBuilder,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private lotesService: LoteService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    ){
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  get f(): any {
    return this.form.controls;
  }

  get modoEditar(): boolean {
    return !this.deveCriarEvento;
  }

  get lotes(): FormArray {
    return (this.form.get('lotes') as FormArray);
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm A',
      showWeekNumbers: false,
    };
  }

  public carregarEvento():void {
   const eventoIdParam = +this.route.snapshot.paramMap.get('id');

   if(eventoIdParam !== null && eventoIdParam !== 0) {
    this.deveCriarEvento = false;

    this.eventoService.getEventoById(+eventoIdParam).subscribe(
      (evento: Evento) => {
        this.evento = {...evento};
        this.form.patchValue(evento);
        this.evento.lotes.forEach((lote) => {
          this.lotes.push(this.criarLote(lote));
        })
      },
      (error) => {
        this.toastr.error('Error ao tentar carregar evento!', 'Erro');
        console.log(error);
      },
    ).add(() => {});
   }
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: [null, Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
      lotes: this.fb.array([]),
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote) : FormGroup {
    return this.fb.group({
      id: [lote.id, []],
      nome: [lote.nome, [Validators.required]],
      preco: [lote.preco, [Validators.required]],
      dataInicio: [lote.dataInicio, []],
      dataFim: [lote.dataFim, []],
      quantidade: [lote.quantidade, [Validators.required]],
    })
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  excluirLote(loteIndex: number, template: TemplateRef<any>): void {
    const lote = this.lotes.at(loteIndex).value as Lote;

    this.loteAtual.id = lote.id;
    this.loteAtual.indice = loteIndex;
    this.loteAtual.nome = lote.nome;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public resetForm(formGroup: FormGroup) {
    formGroup.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched}; 
  }

  salvarLotes() : void {
    console.log(this.evento.id);
    if(this.form.controls.lotes.valid){
      this.lotesService.saveLotes(this.evento.id, this.lotes.value).subscribe(
        (lotes: Lote[]) => {
          this.toastr.success("Lotes salvo com sucesso!", "Salvar");
        },
        (error) => {
          this.toastr.error("Erro ao tentar salvar lotes!\n"+ error, "Erro");
        },
      );
    }
  }

  salvarEvento(): void {
    if(this.form.valid) {
      
      const observer = {
        next: (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(evento);
          this.toastr.success("Evento salvo com sucesso!", "Evento");
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Error ao tentar salvar evento!', 'Erro');
        },
        complete: () => {}
      };
      
      if(this.deveCriarEvento){
        this.evento = {...this.form.value};
        this.eventoService.postEvento(this.evento).subscribe(observer);
      } else {
        this.evento = {id: this.evento.id, ...this.form.value};
        this.eventoService.putEvento(this.evento).subscribe(observer);
      }

      //this.router.navigate(['/eventos']);
      this.deveCriarEvento = false;
    }
  }

  confirmDeleteLote(): void {
    this.modalRef.hide();
    this.lotesService.deleteLote(this.evento.id, this.loteAtual.id).subscribe(
      () => {
        this.toastr.success("Lote apagado!", "Lote");
        this.lotes.removeAt(this.loteAtual.indice);
      },
      (error) => {
        this.toastr.error("Não foi possível deletar o lote!", "Erro");
        console.error(error);
      }
    );
  }
  declineDeleteLote(): void {
    this.modalRef.hide();
  }
}
