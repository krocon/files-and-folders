import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn} from "@angular/forms";

export class FormGroupTyped<T> extends FormGroup {

  value: T | undefined;

  constructor(
    controls: { [key in keyof T]: AbstractControl },
    validatorOrOpts?: ValidatorFn | Array<ValidatorFn> | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | Array<AsyncValidatorFn> | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  patchValue(
    value: Partial<T> | T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    super.patchValue(value, options);
  }

  get(path: Array<Extract<keyof T, string>> | Extract<keyof T, string>): AbstractControl | never {
    return super.get(path) as AbstractControl | never;
  }

  getRawValue(): T {
    return super.getRawValue();
  }
}
