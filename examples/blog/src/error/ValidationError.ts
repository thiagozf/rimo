import { ValidationError as ClassValidatorError } from 'class-validator'

export class ValidationError extends Error {
  public name: string = 'ValidationError'
  public message: string = 'Validation error'

  constructor(public errors: ClassValidatorError[]) {
    super()
  }
}
