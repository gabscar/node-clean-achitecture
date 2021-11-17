import { InvalidParamError } from '../../errors'
import { Validator } from './validator'

export class CompareFieldsValidation implements Validator {
  private readonly fieldName: string
  private readonly fieldToCompare: string

  constructor (fieldName: string, fieldToCompare: string) {
    this.fieldName = fieldName
    this.fieldToCompare = fieldToCompare
  }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }
  }
}
