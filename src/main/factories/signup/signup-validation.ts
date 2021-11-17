import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validator } from '../../../presentation/helpers/validators/validator'
import { ValidatorComposite } from '../../../presentation/helpers/validators/validators-composit'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidatorComposite => {
  const validatations: Validator[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validatations.push((new RequiredFieldValidation(field)))
  }
  validatations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validatations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validatations)
}
