import { makeSignUpValidation } from './signup-validation'
import { ValidatorComposite } from '../../../presentation/helpers/validators/validators-composit'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validator } from '../../../presentation/helpers/validators/validator'
import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

jest.mock('../../../presentation/helpers/validators/validators-composit')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validatations', () => {
    makeSignUpValidation()
    const validations: Validator[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push((new RequiredFieldValidation(field)))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validations)
  })
})
