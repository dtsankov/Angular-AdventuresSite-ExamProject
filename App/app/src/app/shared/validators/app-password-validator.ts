import { FormGroup, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passCtrl1: string,
  passCtrl2: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const pass1 = control.get(passCtrl1);
    const pass2 = control.get(passCtrl2);

    return pass1?.value === pass2?.value
      ? null
      : { matchPasswordsValidator: true };
  };
}