import { MissingParamError } from '../../errors'
import { Validator } from './validator'

export class RequiredFieldValidation implements Validator {
  private readonly fieldName: string
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
