import { Validator } from './validator'

export class ValidatorComposite implements Validator {
  private readonly validations: Validator[]
  constructor (validations: Validator[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
