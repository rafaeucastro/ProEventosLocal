import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventoService } from '@app/service/evento.service';
import { Evento } from '@app/models/evento';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  form: FormGroup;
  evento = {} as Evento;
  deveCriarEvento = true;

  constructor(private fb: FormBuilder,
    private localeService: BsLocaleService,
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private toastr: ToastrService,
    private router: Router,
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

  get bsConfig(): any {
    return {
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm A',
      // containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  public carregarEvento():void {
   const eventoIdParam = this.route.snapshot.paramMap.get('id');

   if(eventoIdParam !== null) {
    this.deveCriarEvento = false;
    this.eventoService.getEventoById(+eventoIdParam).subscribe(
      (evento: Evento) => {
        this.evento = {...evento};
        this.form.patchValue(evento);
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
    });
  }

  public resetForm() {
    this.form.reset();
    this.router.navigate(['/eventos']);
  }

  public cssValidator(field: string): any {
    const control = this.form.get(field);
    return {'is-invalid': control.errors && control.touched}; 
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

      this.router.navigate(['/eventos']);
    }
  }
}
