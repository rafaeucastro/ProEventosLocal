import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormValidator } from '../validators';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() field: string;
  @Input() control?: AbstractControl;

  get errorMsg(): string{
    if(this.control.touched) {
      for(const propertyName in this.control?.errors) {
        return  FormValidator.getErrorMsg(this.field, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
