import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { FormValidator } from '@app/shared/validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  get f() {
    return this.form.controls; 
  }

  ngOnInit(): void {
    this.validation();
    console.log(this.f.confirmarSenha);
  }

  isInvalid(field: string): boolean {
    return this.form.get(field).touched && !this.form.get(field).valid;
  }

  onSubmit(): void {
    if(!this.form.valid) return;
    //colocar ação aqui
  }

  validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: FormValidator.MustMatch('senha', 'confirmarSenha')
    };

    this.form = this.fb.group({
      nome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: [null],
      termos: [null, Validators.requiredTrue],
    }, formOptions );
  }

  public resetForm() {
    this.form.reset();
  }

}
