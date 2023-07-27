import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(domains: string[]): ValidatorFn {
  const domainString = domains.join('|');
  const regex = new RegExp(`^[^@]{2,}@[a-zA-Z0-9.-]+\.(${domainString})$`);
  return (control) => {
    return (control.value === '' || regex.test(control.value)) ? null : { appEmailValidator: true };
  };
}