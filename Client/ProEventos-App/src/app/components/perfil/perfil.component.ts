import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '@app/shared/validators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  form: FormGroup;
  profile = {
      titulo: "Pós Doc",
      nome: "user",
      sobrenome: "name",
      email: "user@name.com",
      telefone: "85 98652314",
      funcao: "Palestrante",
      descricao: "Sou o cara!",
      novaSenha: "123456",
      confirmarSenha: "123456",
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  isInvalid(field: string): boolean {
    return this.form.get(field).touched && !this.form.get(field).valid;
  }

  onSubmit(): void {
    if(!this.form.valid) return;
    //colocar ação aqui
  }

  resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: FormValidator.MustMatch('novaSenha', 'confirmarSenha')
    };

    this.form = this.fb.group({
      titulo: [this.profile.titulo, [Validators.required]],
      nome: [this.profile.nome, [Validators.required]],
      sobrenome: [this.profile.sobrenome, [Validators.required]],
      email: [this.profile.email, [Validators.required, Validators.email]],
      telefone: [this.profile.telefone, [Validators.required]],
      funcao: [this.profile.funcao, [Validators.required]],
      descricao: [this.profile.descricao],
      novaSenha: [this.profile.novaSenha, [Validators.required]],
      confirmarSenha: [this.profile.confirmarSenha, [Validators.required]],
    }, formOptions);
  }

  public cssValidator(field: string): any {
    const control = this.form.get(field);
    return {'is-invalid': control.errors && control.touched}; 
  }

}
