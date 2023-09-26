import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export class FormValidator {
  static MustMatch(controlName: string, matchingControlName: string) : any {
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl.errors && !matchingControl.errors.mustMatch) return null;

      if(control.value != matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  static equalsTo(otherField: string) {

    const validator = (formControl: FormControl) => {
      if (!otherField) {
        throw new Error('É necessário informar um campo!');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = formControl.root.get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido!');
      }

      if (formControl.value !== field?.value) {
        return { equalsTo: otherField };
      }

      return null;
    };

    return validator;
  }
  
  static getErrorMsg(field: string, validatorName: string, validatorValue?: number) {
    const msg = { 
      'required': `${field} é obrigatório`,
      'minlength': `${field} deve ter pelo menos ${validatorValue} caracteres!`,
      'maxlength': `${field} deve ter pelo no máximo ${validatorValue} caracteres!`,
  };

    return msg[validatorName];
  }
}
